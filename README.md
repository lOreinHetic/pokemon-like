# pokemon-like

## Description
Ce projet est un jeu type Pokemon, où il y a deux joueurs qui s'affrontent tour après tour.

## Installation
Pour lancer le projet, assurez-vous d'avoir Node.js and npm d'installé, puis suiver les étapes :

1. **Clonner le repository**:
    ```bash
   git clone https://github.com/lOreinHetic/pokemon-like.git

2. **Installer Pocketbase**:
- Télécharger Pocketbase : https://pocketbase.io/docs/ (dégaut de compatibilité de git sur les .exe)
- Deziper le dossier
- Récupérer les fichiers : CHANGELOG.md, LICENSE.md, pocketbase.exe
- Se rendre dans le dossier pocketbase (/pokemon-like/server/pocketbase)
- Supprimer les fichiers (CHANGELOG.md, LICENSE.md, pocketbase.exe) de /pokemon-like/server/pocketbase
- Ajouter les fichiers (CHANGELOG.md, LICENSE.md, pocketbase.exe) depuis le dossier dezipé
- Ouvrir le projet pokemon-like dans un IDE

2. **Installer les dépendances**:
- Ouvrir le terminal du dossier server (cd /pokemon-like/server)
- Installer les dependances :
    npm install cors@^2.8.5 ejs@^3.1.10 express@^4.19.2 express-session@^1.18.0 pocketbase@^0.21.4 body-parser@^1.20.2

3. **Lancer le server**:
- Dans le terminal du dossier server (cd /pokemon-like/server)
- Lancer le server
    node index.js

4. **Lancer Pocketbase**:
- Ouvrir le terminal du dossier pocketbase (cd /pokemon-like/server/pocketbase)
- Lancer Pocketbase :
    ./pocketbase serve

5. **Lancer le projet**:
- Aller sur un navigateur web
- Taper l'URL
    http://localhost:3000/signup