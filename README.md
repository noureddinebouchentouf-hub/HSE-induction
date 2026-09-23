# Safety School - Oggaz Plant

Application web de gestion des visites, des demandes EPI et des procédures de sécurité pour l’usine Oggaz.

## Vue d’ensemble

Ce projet est une application Google Apps Script dédiée à la gestion HSE et à l’accueil des visiteurs sur site. Il permet de centraliser les processus suivants :

- affichage des consignes de sécurité,
- consultation des équipements de protection individuelle requis,
- visionnage de la vidéo d’induction sécurité,
- soumission d’une demande d’EPI,
- enregistrement des visiteurs,
- génération d’un badge visiteur,
- stockage des données dans Google Sheets,
- envoi de notifications par email.

## Objectif

L’objectif principal est de sécuriser les accès au site, de formaliser les visites et de simplifier la gestion des équipements de protection individuelle pour les visiteurs et les intervenants externes.

## Fonctionnalités principales

- Page d’accueil HSE et informations sécurité
- Vidéo d’induction obligatoire avant accès
- Formulaire de demande d’EPI
- Registre des visiteurs avec signature numérique
- Suivi des demandes et enregistrement dans Google Sheets
- Génération automatique d’un badge PDF visiteur
- Envoi de notifications par email aux équipes concernées
- Support de code QR pour identification visiteur

## Structure du projet

- `Code.js` : logique serveur Google Apps Script
- `Index.html` : interface utilisateur web
- `.gitignore` : règles d’exclusion Git
- `README.md` : documentation du projet

## Stack technique

- Google Apps Script
- Google Sheets
- Google Drive
- Gmail / MailApp
- HTML / CSS / JavaScript
- Tailwind CSS

## Prérequis

Avant de déployer le projet, il faut disposer de :

- un compte Google,
- un accès à Google Apps Script,
- un fichier Google Sheet avec les feuilles nécessaires,
- un accès Google Drive pour les fichiers générés,
- une boîte mail Gmail pour l’envoi d’emails.

## Feuilles attendues dans le classeur

Le projet est conçu pour fonctionner avec les feuilles suivantes :

- `DemandesEPI`
- `Registre visiteurs`
- `ADM` (si les notifications sont envoyées à un ou plusieurs responsables)

Des feuilles supplémentaires, comme `User`, peuvent être ajoutées selon les besoins d’authentification ou d’administration.

## Checklist de déploiement

### 1. Préparer le projet Apps Script

1. Ouvrir Google Apps Script.
2. Créer un nouveau projet.
3. Coller le contenu de `Code.js` dans le fichier principal.
4. Coller le contenu de `Index.html` dans le fichier HTML du projet.

### 2. Vérifier la logique métier

Avant publication, vérifier :

- les noms des feuilles sont exactement corrects,
- les identifiants Drive et Spreadsheet sont valides,
- les emails de notification sont corrects,
- les formulaires renvoient bien des messages de succès,
- les visiteurs sont bien enregistrés dans la feuille adaptée.

### 3. Publier l’application web

1. Cliquer sur `Deploy`.
2. Sélectionner `New deployment`.
3. Choisir `Web app`.
4. Configurer :
   - `Execute as`: Me
   - `Who has access`: Anyone
5. Enregistrer et publier.
6. Copier l’URL publique.

### 4. Tester en production

Après publication, vérifier :

- l’accès depuis un navigateur public,
- le formulaire de demande EPI,
- le registre visiteur,
- l’envoi d’email,
- l’écriture dans les feuilles Google,
- la génération du badge visiteur et du fichier associé.

## Points importants avant mise en production

- Ce projet est conçu pour un accès public aux visiteurs et doit être publié comme Web App Apps Script.
- Il dépend de Google Sheets et Google Drive, donc les identifiants et structures doivent être validés.
- Il est recommandé de valider le workflow avec le service HSE avant mise en ligne.
- Les adresses email internes utilisées pour les notifications doivent être vérifiées avant déploiement final.

## Publication sur GitHub

### Initialiser le dépôt

```bash
git init
git add .
git commit -m "Initial release"
git branch -M main
git remote add origin https://github.com/VOTRE_UTILISATEUR/VOTRE_REPO.git
git push -u origin main
```

### Structure recommandée du dépôt

```text
.
├── .gitignore
├── README.md
├── Code.js
├── Index.html
├── LICENSE (optionnel)
└── .github (optionnel)
```

## Recommandations de sécurité

- ne jamais stocker de secrets ou de clés dans le dépôt,
- vérifier les permissions avant publication,
- garder le dépôt GitHub comme source principale du code,
- ne pas exposer d’informations sensibles dans le code,
- valider chaque flux processus avant mise en ligne.

## Licence

Ce projet est destiné à un usage interne opérationnel et peut être adapté selon les règles internes de l’organisation.

## Support et maintenance

Toute modification des règles métier, des procédures HSE ou des besoins d’accès doit être validée par le service responsable avant déploiement final.
