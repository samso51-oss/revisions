# 🎓 Assistant de Révisions

Application web interactive pour aider les enfants à réviser leurs cours, s'entraîner sur des exercices et préparer leurs évaluations.

## 🌟 Fonctionnalités

- **Personnalisation** : Nom de l'élève et ton adapté (amical, sérieux, ludique)
- **Multi-niveaux** : Du CE1 à la Terminale
- **Toutes les matières** : Français, Mathématiques, Sciences, Histoire-Géographie, etc.
- **3 modes** :
  - 📖 Comprendre une leçon
  - ✏️ S'entraîner sur des exercices
  - 🎯 Préparer une évaluation
- **Chat interactif** : Discussion en temps réel avec l'IA
- **Sauvegarde automatique** : Les sessions sont sauvegardées
- **Boutons contextuels** : Vidéos, exercices adaptés, corrections détaillées

## 🚀 Installation et Utilisation

### Option 1 : Utilisation locale (RECOMMANDÉE pour la sécurité)

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/VOTRE_USERNAME/revisions.git
   cd revisions
   ```

2. **Configurer la clé API**
   ```bash
   # Copier le fichier d'exemple
   cp config.example.js config.js
   
   # Éditer config.js et remplacer YOUR_API_KEY_HERE par votre vraie clé OpenAI
   ```

3. **Ouvrir dans le navigateur**
   - Ouvrir `index.html` dans votre navigateur
   - Ou utiliser un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve
   ```

4. **Accéder à l'application**
   - Local : `file:///chemin/vers/index.html`
   - Serveur local : `http://localhost:8000`

### Option 2 : Déploiement sur Netlify (avec variables d'environnement)

1. **Créer un compte sur [Netlify](https://www.netlify.com/)**

2. **Importer votre dépôt GitHub**

3. **Configurer les variables d'environnement**
   - Aller dans : Site settings → Environment variables
   - Ajouter : `OPENAI_API_KEY` avec votre clé API

4. **Déployer**
   - Netlify génère automatiquement un lien public

### Option 3 : GitHub Pages (SANS clé API intégrée)

⚠️ **Attention** : Avec GitHub Pages, chaque utilisateur doit saisir sa propre clé API

1. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source : Deploy from branch → main
   - Folder : / (root)

2. **Accéder au site**
   - `https://VOTRE_USERNAME.github.io/revisions/`

## 🔑 Obtenir une clé API OpenAI

1. Créer un compte sur [OpenAI](https://platform.openai.com/)
2. Aller dans [API Keys](https://platform.openai.com/api-keys)
3. Créer une nouvelle clé API
4. ⚠️ **IMPORTANT** : Ne jamais partager votre clé API publiquement

## 📁 Structure du projet

```
revisions/
├── index.html          # Page principale
├── style.css           # Styles
├── app.js              # Logique JavaScript
├── config.example.js   # Exemple de configuration
├── config.js           # Configuration avec clé API (non commité)
├── .gitignore          # Fichiers à ignorer
└── README.md           # Ce fichier
```

## ⚙️ Configuration

### Fichier `config.js`

```javascript
const CONFIG = {
    OPENAI_API_KEY: 'sk-...',  // Votre clé API
    MODEL: 'gpt-4',             // ou 'gpt-3.5-turbo' pour moins cher
    TEMPERATURE: 0.7,           // Créativité (0-1)
    MAX_TOKENS: 2000            // Longueur des réponses
};
```

## 🛡️ Sécurité

### ⚠️ Points importants

1. **NE JAMAIS committer `config.js`** sur GitHub (il est dans `.gitignore`)
2. **Pour un usage familial privé** : Garder le site en local ou sur Netlify
3. **Pour un site public** : Chaque utilisateur doit avoir sa propre clé API

### Solution recommandée pour un usage familial

**Utilisation locale avec config.js** :
- ✅ Sécurisé : la clé reste sur votre ordinateur
- ✅ Simple : pas besoin de saisir la clé à chaque fois
- ✅ Rapide : pas de déploiement nécessaire

**Alternative : Netlify avec variables d'environnement**
- ✅ Accessible en ligne
- ✅ Clé API protégée
- ⚠️ Nécessite une fonction serverless (plus complexe)

## 🎯 Matières et niveaux disponibles

### Primaire
- Français, Mathématiques, Sciences, Histoire, Géographie, Anglais

### Collège
- Français, Mathématiques, Histoire-Géographie, SVT, Physique-Chimie, Technologie, Anglais, Espagnol, Allemand

### Lycée
- Français, Philosophie, Mathématiques, Histoire-Géographie, SVT, Physique-Chimie, SES, HGGSP, HLP, Langues

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 License

Ce projet est sous licence MIT.

## 💡 Conseils d'utilisation

1. **Commencez par comprendre la leçon** avant de faire des exercices
2. **Utilisez le bouton "Vidéos"** pour des explications complémentaires
3. **N'hésitez pas à demander des indices** pendant les exercices
4. **Changez d'activité** sans créer une nouvelle session pour garder le contexte

## 🐛 Problèmes connus

- La clé API doit être valide et avoir du crédit OpenAI
- Le chat nécessite une connexion internet
- Les messages très longs peuvent être tronqués

## 📧 Support

Pour toute question, ouvrez une issue sur GitHub.
