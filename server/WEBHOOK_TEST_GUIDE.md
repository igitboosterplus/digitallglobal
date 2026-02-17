# Guide de test du webhook Stripe en local

## Option 1 : Utiliser Stripe CLI (Recommandé)

### Installation de Stripe CLI
1. Téléchargez Stripe CLI : https://stripe.com/docs/stripe-cli
2. Installez-le sur Windows
3. Ouvrez un nouveau terminal PowerShell
4. Connectez-vous : `stripe login`
5. Lancez le webhook forwarding :
   ```
   stripe listen --forward-to localhost:5000/api/webhook/stripe
   ```
6. Notez le webhook signing secret qui commence par `whsec_...`
7. Mettez à jour ce secret dans votre fichier .env à la ligne STRIPE_WEBHOOK_SECRET

### Tester un paiement
Dans un autre terminal :
```
stripe trigger checkout.session.completed
```

## Option 2 : Test manuel sans webhook (pour développement)

Vous pouvez créer un script de test qui simule directement la création de compte :

1. Ouvrez un terminal dans le dossier server
2. Exécutez : `node test-email.js` (voir fichier ci-dessous)

---

## Vérifications importantes

✅ Le serveur backend doit tourner sur le port 5000
✅ Les credentials SMTP doivent être corrects dans .env
✅ L'adresse email Gmail doit avoir activé "Mots de passe d'application"
✅ Le webhook secret Stripe doit être configuré dans .env

## Checklist de débogage

Si vous ne recevez toujours pas d'emails :
1. Vérifiez les logs du serveur backend
2. Vérifiez que l'email n'est pas dans les spams
3. Testez l'envoi d'email avec le script test-email.js
4. Vérifiez que le compte Gmail n'a pas de restrictions de sécurité
