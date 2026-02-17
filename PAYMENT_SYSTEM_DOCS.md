# 🚀 Système de Paiement et Création de Compte Automatique

## ✅ Architecture Production-Ready (Sans Webhooks Locaux)

### Comment ça fonctionne ?

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│   CLIENT    │─────▶│   STRIPE    │─────▶│   SUCCESS    │
│  (Frontend) │      │  (Paiement) │      │     PAGE     │
└─────────────┘      └─────────────┘      └──────┬───────┘
                                                   │
                                                   │ Vérification automatique
                                                   ▼
                                          ┌────────────────┐
                                          │   BACKEND API  │
                                          │ verify-session │
                                          └────────┬───────┘
                                                   │
                      ┌────────────────────────────┼────────────────────────┐
                      │                            │                        │
                      ▼                            ▼                        ▼
              ┌───────────────┐          ┌─────────────┐          ┌────────────┐
              │  Création BD  │          │ Envoi Email │          │   Stripe   │
              │  - Utilisateur│          │  - Bienvenue│          │   Check    │
              │  - Abonnement │          │  - Identifs │          │   Status   │
              └───────────────┘          └─────────────┘          └────────────┘
```

## 📝 Flux de Paiement Complet

### 1️⃣ Initiation du Paiement (Frontend)
- Client clique sur "COMMANDER"
- Frontend → POST `/api/payment/create-checkout-session`
- Backend crée une session Stripe
- Client redirigé vers Stripe Checkout

### 2️⃣ Paiement sur Stripe
- Client entre ses informations de carte
- Stripe traite le paiement
- Si succès → Redirection vers `/success?session_id=XXX`

### 3️⃣ Vérification Automatique (Success Page)
- La page `/success` charge
- Appel automatique à `/api/payment/verify-session/:sessionId`
- Backend vérifie le statut du paiement via l'API Stripe
- Si `payment_status === 'paid'` → Traitement

### 4️⃣ Création de Compte (Backend)
✅ Vérification anti-doublon (session déjà traitée?)
✅ Création utilisateur dans la BD
✅ Génération mot de passe sécurisé (16 caractères)
✅ Hashage bcrypt du mot de passe
✅ Enregistrement de l'abonnement
✅ Création de l'entrée client_sites

### 5️⃣ Envoi Email (Backend)
✅ Email HTML premium avec template responsive
✅ Contient :
  - Identifiants (email + mot de passe temporaire)
  - Détails de commande (plan, montant, ID transaction)
  - Lien vers espace membre
  - Guide des prochaines étapes

## 🔧 Configuration Requise

### Backend (.env)
```env
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Optionnel en production avec cette méthode

# Email SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application

# URLs
FRONTEND_URL=https://votre-site.com
MEMBER_AREA_URL=https://votre-site.com/member-area
```

### Frontend (.env)
```env
VITE_API_URL=https://votre-api.com  # En production
# ou http://localhost:5000 en développement
```

## 🧪 Tests

### Test en Local (Développement)
1. Démarrez le backend : `npm run dev` (dans /server)
2. Démarrez le frontend : `npm run dev` (dans /root)
3. Allez sur http://localhost:5173
4. Cliquez sur "COMMANDER"
5. Utilisez la carte de test : `4242 4242 4242 4242`
6. Date : n'importe quelle date future
7. CVC : n'importe quel 3 chiffres
8. Après paiement → Vérifiez votre email !

### Test en Production
Étapes identiques, mais avec de vraies URLs et potentiellement de vraies cartes (mode live Stripe).

## 🔒 Sécurité

✅ **Pas de stockage de carte** : Géré par Stripe
✅ **Mots de passe hashés** : bcrypt avec salt automatique
✅ **Vérification Stripe** : On récupère les données directement depuis leur API
✅ **Anti-doublon** : Vérification de session déjà traitée
✅ **HTTPS en production** : Obligatoire pour Stripe
✅ **Variables d'environnement** : Secrets jamais dans le code

## 📊 Base de Données

### Tables utilisées :
1. **users** : Comptes utilisateurs
2. **plans** : Offres disponibles (Access, Premium, Platinium)
3. **subscriptions** : Abonnements actifs
4. **client_sites** : Sites en cours de création

## 🚀 Déploiement Production

### Backend
1. Héberger sur un service type Heroku, Railway, Render
2. Configurer les variables d'environnement
3. Activer HTTPS (obligatoire)
4. S'assurer que le port est bien configuré

### Frontend
1. Build : `npm run build`
2. Héberger les fichiers du dossier `dist/`
3. Configurer VITE_API_URL vers l'URL du backend

### Stripe
1. Dashboard Stripe → Developers → Webhooks
2. Ajouter un endpoint (optionnel avec notre méthode) :
   - URL : `https://votre-api.com/api/webhook/stripe`
   - Events : `checkout.session.completed`
3. Basculer en mode Live quand tout est testé

## 💡 Avantages de cette Architecture

✅ **Fonctionne partout** : Local, staging, production
✅ **Pas de tunnel requis** : Pas besoin de ngrok/Stripe CLI en développement
✅ **Fiable** : Vérification directe via l'API Stripe
✅ **Rapide** : L'utilisateur voit immédiatement la confirmation
✅ **Sécurisé** : Aucune manipulation côté client
✅ **Scalable** : Prêt pour la production

## 🐛 Debugging

### L'email n'arrive pas ?
1. Vérifiez les logs du serveur backend
2. Vérifiez SMTP_USER et SMTP_PASS dans .env
3. Vérifiez les spams
4. Testez avec : `node test-email.js`

### Le compte n'est pas créé ?
1. Vérifiez que la BD est accessible
2. Vérifiez les logs : vous devriez voir "💰 Processing payment for: ..."
3. Vérifiez que le price_id correspond à un plan dans la table `plans`

### La redirection ne marche pas ?
1. Vérifiez FRONTEND_URL dans .env du backend
2. Vérifiez que React Router est bien configuré
3. Vérifiez la console browser pour les erreurs

## 📞 Support

En cas de problème, vérifiez :
1. Les logs du serveur backend
2. La console du navigateur (F12)
3. Le dashboard Stripe (Payments → Sessions)
4. Votre base de données directement

---

**Fait avec ❤️ pour Digitall Global**
