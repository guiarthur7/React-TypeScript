# TP2 — Vidéothèque

Ce projet est une application React statique développée avec TypeScript et mise en forme avec Tailwind CSS. Il met en place un mini "design system" avec des composants réutilisables, robustes et strictement typés.

## 🚀 Démarrage rapide

### 1. Installer les dépendances
Assurez-vous d'avoir Node.js installé sur votre machine, puis ouvrez un terminal à la racine du projet et lancez :

```bash
npm install
```

### 2. Démarrer le serveur de développement
Pour lancer le projet et voir les modifications en direct :

```bash
npm run dev
```
Ouvrez ensuite le lien affiché dans le terminal (généralement http://localhost:5173) avec votre navigateur.

### 3. Composants du Design System
Le projet repose sur 4 composants principaux rangés dans src/composants/ :

Bouton : Un bouton d'action avec 3 variantes (primaire, secondaire, danger) gérées par un Record.

Badge : Une pastille de statut avec différents tons de couleur.

Carte : Un conteneur flexible qui accepte du contenu libre via sa prop children.

ListeFilms : Le composant chef d'orchestre qui assemble les éléments précédents dans une grille responsive.

### 4. Technologies utilisées
React (via Vite)

TypeScript (Typage strict, zéro any)

Tailwind CSS (Approche utility-first & mobile-first)
