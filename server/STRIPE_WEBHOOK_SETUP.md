# Configuration Stripe Webhooks - Guide d'installation

## Étape 1 : Télécharger Stripe CLI

### Pour Windows :
1. Téléchargez : https://github.com/stripe/stripe-cli/releases/latest
2. Cherchez le fichier `stripe_X.X.X_windows_x86_64.zip`
3. Extrayez le fichier `stripe.exe` dans un dossier (ex: C:\stripe)
4. Ajoutez ce dossier au PATH Windows (optionnel mais recommandé)

## Étape 2 : Connexion à Stripe

Ouvrez PowerShell et exécutez :
```powershell
stripe login
```

Cela ouvrira votre navigateur pour autoriser l'accès.

## Étape 3 : Démarrer le webhook forwarding

Dans un nouveau terminal PowerShell, exécutez :
```powershell
stripe listen --forward-to localhost:5000/api/webhook/stripe
```

⚠️ **IMPORTANT** : Copiez le "webhook signing secret" qui s'affiche (commence par `whsec_`)

## Étape 4 : Mettre à jour votre .env

Remplacez la ligne `STRIPE_WEBHOOK_SECRET=whsec_...` dans votre fichier `.env` par le nouveau secret.

## Étape 5 : Tester un paiement

Dans un AUTRE terminal (gardez stripe listen actif) :
```powershell
stripe trigger checkout.session.completed
```

Ou faites un vrai paiement test sur votre site avec la carte : `4242 4242 4242 4242`

---

## Alternative : Test rapide sans Stripe CLI

Si vous voulez tester rapidement SANS installer Stripe CLI, vous pouvez :
1. Faire un paiement test directement sur votre site
2. Le webhook ne fonctionnera pas EN LOCAL
3. Mais vous verrez la redirection vers /success
4. Vous pouvez ensuite appeler manuellement le endpoint webhook avec node test-webhook.js

⚠️ Pour la PRODUCTION, vous devrez configurer un webhook dans le dashboard Stripe avec votre URL publique.
