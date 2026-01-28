// Données de l'application
let appData = {
    studentName: '',
    tone: '',
    level: '',
    subject: '',
    topic: '',
    activity: ''
};

// Charger les données sauvegardées au démarrage
function loadSavedData() {
    const savedData = localStorage.getItem('appData');
    if (savedData) {
        try {
            appData = JSON.parse(savedData);
        } catch (e) {
            console.error('Erreur lors du chargement des données:', e);
        }
    }
    
    const savedConversation = localStorage.getItem('conversationHistory');
    if (savedConversation) {
        try {
            conversationHistory = JSON.parse(savedConversation);
        } catch (e) {
            console.error('Erreur lors du chargement de la conversation:', e);
        }
    }
    
    const savedActivityType = localStorage.getItem('currentActivityType');
    if (savedActivityType) {
        currentActivityType = savedActivityType;
    }
    
    // Si une session était en cours, la restaurer
    if (conversationHistory.length > 0 && appData.studentName) {
        restoreSession();
    }
}

// Sauvegarder les données
function saveData() {
    localStorage.setItem('appData', JSON.stringify(appData));
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    localStorage.setItem('currentActivityType', currentActivityType);
}

// Restaurer la session
function restoreSession() {
    if (confirm(`Bonjour ${appData.studentName} ! Une session de révision était en cours. Veux-tu la reprendre ?`)) {
        setupChatInfo();
        showStep('step-chat');
        
        // Réafficher les messages
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML = '';
        
        conversationHistory.forEach(msg => {
            if (msg.role === 'user') {
                displayMessage('user', msg.content);
            } else if (msg.role === 'assistant') {
                displayMessage('assistant', msg.content);
            }
        });
        
        updateActionButtons();
    } else {
        // Réinitialiser
        conversationHistory = [];
        saveData();
    }
}

// Charger les données au démarrage
window.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
});

// Matières par niveau
const subjectsByLevel = {
    'CE1': ['Français', 'Mathématiques', 'Questionner le monde'],
    'CE2': ['Français', 'Mathématiques', 'Questionner le monde'],
    'CM1': ['Français', 'Mathématiques', 'Sciences', 'Histoire', 'Géographie', 'Anglais'],
    'CM2': ['Français', 'Mathématiques', 'Sciences', 'Histoire', 'Géographie', 'Anglais'],
    '6ème': ['Français', 'Mathématiques', 'Histoire-Géographie', 'SVT', 'Technologie', 'Anglais'],
    '5ème': ['Français', 'Mathématiques', 'Histoire-Géographie', 'SVT', 'Physique-Chimie', 'Technologie', 'Anglais', 'Espagnol', 'Allemand'],
    '4ème': ['Français', 'Mathématiques', 'Histoire-Géographie', 'SVT', 'Physique-Chimie', 'Technologie', 'Anglais', 'Espagnol', 'Allemand'],
    '3ème': ['Français', 'Mathématiques', 'Histoire-Géographie', 'SVT', 'Physique-Chimie', 'Technologie', 'Anglais', 'Espagnol', 'Allemand'],
    'Seconde': ['Français', 'Mathématiques', 'Histoire-Géographie', 'SVT', 'Physique-Chimie', 'SES', 'Anglais', 'Espagnol', 'Allemand'],
    'Première': ['Français', 'Philosophie', 'Mathématiques', 'Histoire-Géographie', 'SES', 'SVT', 'Physique-Chimie', 'HGGSP', 'HLP', 'Anglais', 'Espagnol', 'Allemand'],
    'Terminale': ['Philosophie', 'Mathématiques', 'Histoire-Géographie', 'SES', 'SVT', 'Physique-Chimie', 'HGGSP', 'HLP', 'Anglais', 'Espagnol', 'Allemand']
};

// Sujets par matière et niveau (exemples)
const topicsBySubject = {
    'Mathématiques': {
        'primaire': ['Addition', 'Soustraction', 'Multiplication', 'Division', 'Tables de multiplication', 'Fractions', 'Décimaux', 'Géométrie', 'Mesures de longueur', 'Mesures de masse', 'Périmètre', 'Aires', 'Angles', 'Symétrie', 'Proportionnalité', 'Problèmes'],
        'collège': ['Nombres relatifs', 'Fractions', 'Nombres décimaux', 'Puissances', 'Racines carrées', 'Équations', 'Inéquations', 'Proportionnalité', 'Pourcentages', 'Vitesse moyenne', 'Théorème de Pythagore', 'Théorème de Thalès', 'Trigonométrie', 'Géométrie dans l\'espace', 'Volumes', 'Statistiques', 'Probabilités', 'Fonctions linéaires', 'Fonctions affines', 'Développement', 'Factorisation', 'Calcul littéral'],
        'lycée': ['Fonctions', 'Dérivées', 'Limites', 'Suites arithmétiques', 'Suites géométriques', 'Probabilités conditionnelles', 'Lois de probabilité', 'Échantillonnage', 'Géométrie dans l\'espace', 'Produit scalaire', 'Trigonométrie', 'Vecteurs', 'Nombres complexes', 'Exponentielle', 'Logarithme', 'Primitives', 'Intégrales', 'Algorithmes', 'Python']
    },
    'Français': {
        'primaire': ['Grammaire', 'Nature des mots', 'Fonction des mots', 'Conjugaison', 'Présent', 'Futur', 'Imparfait', 'Passé composé', 'Passé simple', 'Orthographe', 'Homophones', 'Accords', 'Vocabulaire', 'Synonymes', 'Antonymes', 'Familles de mots', 'Lecture', 'Compréhension de texte', 'Production d\'écrit', 'Poésie', 'Récit'],
        'collège': ['Classes grammaticales', 'Fonctions grammaticales', 'Propositions', 'Conjugaison', 'Modes et temps', 'Orthographe', 'Accords', 'Vocabulaire', 'Préfixes et suffixes', 'Lecture analytique', 'Figures de style', 'Métaphore', 'Comparaison', 'Rédaction', 'Argumentation', 'Roman', 'Nouvelle', 'Poésie', 'Théâtre', 'Fable'],
        'lycée': ['Dissertation', 'Commentaire de texte', 'Contraction de texte', 'Essai', 'Argumentation', 'Genres littéraires', 'Roman', 'Poésie', 'Théâtre', 'Œuvre intégrale', 'Figures de style', 'Registres littéraires', 'Mouvements littéraires', 'Humanisme', 'Classicisme', 'Romantisme', 'Réalisme', 'Naturalisme', 'Symbolisme', 'Surréalisme']
    },
    'Histoire-Géographie': {
        'collège': ['Égypte antique', 'Grèce antique', 'Rome antique', 'Empire romain', 'Christianisme', 'Empire byzantin', 'Islam', 'Moyen Âge', 'Féodalité', 'Croisades', 'Renaissance', 'Humanisme', 'Grandes découvertes', 'Réforme protestante', 'Monarchie absolue', 'Lumières', 'Révolution française', 'Empire napoléonien', 'Europe au XIXe siècle', 'Révolution industrielle', 'Colonisation', 'Continents', 'Climats', 'Relief', 'Population mondiale', 'Villes', 'Développement durable'],
        'lycée': ['Première Guerre mondiale', 'Révolution russe', 'Entre-deux-guerres', 'Régimes totalitaires', 'Seconde Guerre mondiale', 'Génocide', 'Guerre froide', 'Décolonisation', 'Construction européenne', 'Monde bipolaire', 'Nouvelles conflictualités', 'Mondialisation', 'Puissances mondiales', 'États-Unis', 'Chine', 'Union européenne', 'Frontières', 'Mers et océans', 'Environnement', 'Ressources', 'Migrations']
    },
    'Histoire': {
        'primaire': ['Préhistoire', 'Antiquité', 'Gaulois', 'Romains', 'Moyen Âge', 'Rois de France', 'Châteaux forts', 'Chevaliers', 'Renaissance', 'François Ier', 'Temps modernes', 'Louis XIV', 'Révolution française', 'Napoléon', 'XIXe siècle', 'XXe siècle']
    },
    'Géographie': {
        'primaire': ['Ma ville', 'Ma région', 'La France', 'Départements', 'Régions', 'Paris', 'Paysages', 'Montagnes', 'Mers', 'Fleuves', 'Europe', 'Pays européens', 'Monde', 'Continents', 'Océans']
    },
    'SVT': {
        'collège': ['La cellule', 'Observation microscope', 'Reproduction humaine', 'Puberté', 'Système reproducteur', 'Reproduction végétale', 'Évolution', 'Sélection naturelle', 'Fossiles', 'Classification', 'Écosystèmes', 'Chaînes alimentaires', 'Réseaux trophiques', 'Nutrition', 'Digestion', 'Respiration', 'Circulation sanguine', 'Système nerveux', 'Immunité', 'Vaccination', 'Génétique', 'ADN', 'Chromosomes', 'Hérédité'],
        'lycée': ['ADN et information génétique', 'Réplication', 'Transcription', 'Traduction', 'Mutations', 'Génétique', 'Brassage génétique', 'Méiose', 'Mitose', 'Évolution', 'Phylogénie', 'Immunologie', 'Réaction immunitaire', 'Mémoire immunitaire', 'Photosynthèse', 'Respiration cellulaire', 'Métabolisme', 'Enzymes', 'Géologie', 'Tectonique des plaques', 'Magmatisme', 'Climats', 'Paléoclimatologie']
    },
    'Physique-Chimie': {
        'collège': ['États de la matière', 'Changements d\'état', 'Mélanges', 'Solutions', 'Masse', 'Volume', 'Masse volumique', 'Atomes', 'Molécules', 'Ions', 'Réactions chimiques', 'Combustion', 'Circuits électriques', 'Courant électrique', 'Tension', 'Résistance', 'Loi d\'Ohm', 'Puissance électrique', 'Énergie', 'Lumière', 'Sources lumineuses', 'Propagation', 'Vitesse de la lumière', 'Forces', 'Poids', 'Gravitation'],
        'lycée': ['Mécanique', 'Cinématique', 'Forces', 'Lois de Newton', 'Énergie cinétique', 'Énergie potentielle', 'Travail', 'Puissance', 'Électricité', 'Dipôles', 'Condensateurs', 'Bobines', 'Ondes', 'Ondes sonores', 'Ondes électromagnétiques', 'Interférences', 'Diffraction', 'Chimie organique', 'Groupes caractéristiques', 'Réactions organiques', 'Acides et bases', 'pH', 'Titrage', 'Oxydoréduction', 'Piles', 'Électrolyse', 'Spectroscopie']
    },
    'SES': {
        'lycée': ['Marché', 'Offre et demande', 'Prix', 'Consommation', 'Épargne', 'Revenus', 'Entreprise', 'Production', 'Productivité', 'Coûts', 'Profit', 'Chômage', 'Emploi', 'Salaires', 'Croissance économique', 'PIB', 'Développement', 'Inflation', 'Déflation', 'Monnaie', 'Banque centrale', 'Politique monétaire', 'Budget de l\'État', 'Politique budgétaire', 'Fiscalité', 'Commerce international', 'Mondialisation', 'Protectionnisme', 'Libre-échange', 'Socialisation', 'Normes', 'Valeurs', 'Culture', 'Stratification sociale', 'Classes sociales', 'Mobilité sociale', 'Inégalités', 'Justice sociale']
    },
    'HGGSP': {
        'lycée': ['Puissances internationales', 'États-Unis', 'Chine', 'Russie', 'Union européenne', 'Soft power', 'Hard power', 'Diplomatie', 'ONU', 'OTAN', 'Guerre froide', 'Conflits actuels', 'Terrorisme', 'Frontières', 'Mers et océans', 'Espace', 'Patrimoine', 'Histoire et mémoire', 'Seconde Guerre mondiale', 'Décolonisation', 'Environnement', 'Développement durable', 'Nouvelles technologies', 'Information']
    },
    'HLP': {
        'lycée': ['Humanités', 'Philosophie antique', 'Socrate', 'Platon', 'Aristote', 'Littérature antique', 'Épopée', 'Théâtre grec', 'Renaissance', 'Humanisme', 'Littérature humaniste', 'Philosophie moderne', 'Descartes', 'Lumières', 'Voltaire', 'Rousseau', 'Romantisme', 'Réalisme', 'Existentialisme', 'Absurde', 'Art de la parole', 'Éloquence', 'Rhétorique', 'Argumentation', 'Représentation du monde', 'Vérité']
    },
    'Philosophie': {
        'lycée': ['Conscience', 'Inconscient', 'Autrui', 'Désir', 'Bonheur', 'Liberté', 'Devoir', 'Morale', 'Justice', 'État', 'Droit', 'Société', 'Travail', 'Technique', 'Art', 'Beauté', 'Religion', 'Vérité', 'Raison', 'Démonstration', 'Science', 'Temps', 'Nature', 'Culture', 'Langage']
    },
    'Anglais': {
        'primaire': ['Alphabet', 'Nombres', 'Couleurs', 'Famille', 'Corps humain', 'Animaux', 'Nourriture', 'Vêtements', 'Maison', 'École', 'Se présenter', 'Salutations'],
        'collège': ['Grammaire', 'Present simple', 'Present continuous', 'Past simple', 'Past continuous', 'Present perfect', 'Future', 'Modaux', 'Comparatifs', 'Superlatifs', 'Prépositions', 'Vocabulaire', 'Vie quotidienne', 'Loisirs', 'Voyages', 'Compréhension orale', 'Expression orale', 'Expression écrite'],
        'lycée': ['Grammaire avancée', 'Conditionnel', 'Voix passive', 'Discours indirect', 'Relatives', 'Vocabulaire thématique', 'Société', 'Actualité', 'Culture', 'Littérature anglophone', 'Compréhension', 'Expression', 'Argumentation', 'Synthèse de documents', 'Traduction']
    },
    'Espagnol': {
        'collège': ['Alphabet', 'Prononciation', 'Se présenter', 'Famille', 'Vie quotidienne', 'Present', 'Passé composé', 'Imparfait', 'Futur', 'Verbes irréguliers', 'Ser et estar', 'Vocabulaire', 'Culture hispanique'],
        'lycée': ['Grammaire', 'Subjonctif', 'Conditionnel', 'Impératif', 'Gérondif', 'Voix passive', 'Vocabulaire thématique', 'Société espagnole', 'Amérique latine', 'Histoire', 'Littérature', 'Compréhension', 'Expression', 'Argumentation']
    },
    'Allemand': {
        'collège': ['Alphabet', 'Prononciation', 'Se présenter', 'Famille', 'Vie quotidienne', 'Présent', 'Passé', 'Parfait', 'Déclinaisons', 'Articles', 'Cas', 'Vocabulaire', 'Culture allemande'],
        'lycée': ['Déclinaisons avancées', 'Passif', 'Subjonctif', 'Propositions relatives', 'Propositions subordonnées', 'Vocabulaire thématique', 'Société allemande', 'Histoire', 'Littérature', 'Compréhension', 'Expression', 'Argumentation']
    },
    'Sciences': {
        'primaire': ['Vivant et non-vivant', 'Animaux', 'Végétaux', 'Cycle de vie', 'Chaînes alimentaires', 'Respiration', 'Nutrition', 'Corps humain', 'Cinq sens', 'Hygiène', 'Matière', 'Eau', 'Air', 'États de la matière', 'Mélanges', 'Énergie', 'Lumière', 'Électricité', 'Planète Terre', 'Système solaire']
    },
    'Technologie': {
        'collège': ['Objets techniques', 'Besoin', 'Fonction', 'Solutions techniques', 'Matériaux', 'Propriétés des matériaux', 'Énergies', 'Sources d\'énergie', 'Chaîne d\'énergie', 'Transmission du mouvement', 'Informatique', 'Algorithme', 'Programmation', 'Scratch', 'Réseau informatique', 'Internet', 'Design', 'Modélisation', 'Prototypage', 'Développement durable']
    },
    'Questionner le monde': {
        'primaire': ['Temps', 'Calendrier', 'Générations', 'Évolution', 'Histoire', 'Espace', 'Plans', 'Cartes', 'Géographie', 'Vivant', 'Animaux', 'Végétaux', 'Matière', 'Objets', 'Technologie']
    }
};

// Navigation entre les étapes
function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}

function goToStep1() {
    showStep('step-welcome');
}

function goToStep2() {
    const name = document.getElementById('student-name').value.trim();
    const tone = document.getElementById('tone').value;
    
    if (!name) {
        alert('Merci de renseigner ton prénom ! 😊');
        return;
    }
    
    if (!tone) {
        alert('Merci de choisir un ton ! 😊');
        return;
    }
    
    appData.studentName = name;
    appData.tone = tone;
    saveData();
    
    document.getElementById('display-name').textContent = name;
    showStep('step-subject');
}

function goToStep3() {
    const level = document.getElementById('level').value;
    const customSubject = document.getElementById('custom-subject').value.trim();
    const selectedSubject = document.querySelector('.subject-btn.selected');
    
    if (!level) {
        alert('Merci de choisir ta classe ! 😊');
        return;
    }
    
    const subject = customSubject || (selectedSubject ? selectedSubject.textContent : '');
    
    if (!subject) {
        alert('Merci de choisir ou saisir une matière ! 😊');
        return;
    }
    
    appData.level = level;
    appData.subject = subject;
    saveData();
    
    document.getElementById('display-subject').textContent = subject;
    updateTopics();
    showStep('step-topic');
}

function goToStep4() {
    const customTopic = document.getElementById('custom-topic').value.trim();
    const selectedTopic = document.querySelector('.topic-btn.selected');
    
    const topic = customTopic || (selectedTopic ? selectedTopic.textContent : '');
    
    if (!topic) {
        alert('Merci de choisir ou saisir un sujet ! 😊');
        return;
    }
    
    appData.topic = topic;
    saveData();
    
    document.getElementById('display-name-final').textContent = appData.studentName;
    showStep('step-activity');
}

// Mise à jour des matières selon le niveau
function updateSubjects() {
    const level = document.getElementById('level').value;
    const subjectButtons = document.getElementById('subject-buttons');
    
    subjectButtons.innerHTML = '';
    
    if (level && subjectsByLevel[level]) {
        subjectsByLevel[level].forEach(subject => {
            const btn = document.createElement('button');
            btn.className = 'subject-btn';
            btn.textContent = subject;
            btn.onclick = function() {
                document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('custom-subject').value = '';
            };
            subjectButtons.appendChild(btn);
        });
    }
}

// Mise à jour des sujets selon la matière et le niveau
function updateTopics() {
    const topicButtons = document.getElementById('topic-buttons');
    topicButtons.innerHTML = '';
    
    let levelCategory = 'collège';
    if (['CE1', 'CE2', 'CM1', 'CM2'].includes(appData.level)) {
        levelCategory = 'primaire';
    } else if (['Seconde', 'Première', 'Terminale'].includes(appData.level)) {
        levelCategory = 'lycée';
    }
    
    const topics = topicsBySubject[appData.subject]?.[levelCategory] || [];
    
    if (topics.length > 0) {
        topics.forEach(topic => {
            const btn = document.createElement('button');
            btn.className = 'topic-btn';
            btn.textContent = topic;
            btn.onclick = function() {
                document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('custom-topic').value = '';
            };
            topicButtons.appendChild(btn);
        });
    } else {
        topicButtons.innerHTML = '<p style="color: #999; font-style: italic;">Aucun sujet prédéfini pour cette matière. Saisis ton sujet ci-dessous.</p>';
    }
}

// Sélection de l'activité
function selectActivity(activityType) {
    const activityNames = {
        'comprendre': 'Comprendre une leçon',
        'entrainer': 'M\'entraîner sur des exercices',
        'evaluer': 'Préparer une évaluation'
    };
    
    appData.activity = activityNames[activityType];
    saveData();
    
    // Afficher le résumé
    document.getElementById('summary-name').textContent = appData.studentName;
    document.getElementById('summary-tone').textContent = getToneName(appData.tone);
    document.getElementById('summary-level').textContent = appData.level;
    document.getElementById('summary-subject').textContent = appData.subject;
    document.getElementById('summary-topic').textContent = appData.topic;
    document.getElementById('summary-activity').textContent = appData.activity;
    
    showStep('step-summary');
}

// Obtenir le nom du ton
function getToneName(toneValue) {
    const tones = {
        'amical': 'Amical et encourageant 😊',
        'serieux': 'Sérieux et professionnel 📚',
        'ludique': 'Ludique et amusant 🎮'
    };
    return tones[toneValue] || toneValue;
}

// Variables globales pour le chat
let conversationHistory = [];
// Vérifier si CONFIG existe (config.js chargé) sinon utiliser localStorage
let apiKey = (typeof CONFIG !== 'undefined' && CONFIG.OPENAI_API_KEY && CONFIG.OPENAI_API_KEY !== 'YOUR_API_KEY_HERE') 
    ? CONFIG.OPENAI_API_KEY 
    : (localStorage.getItem('openai_api_key') || '');
let currentActivityType = '';

// Lancer la session
function startSession() {
    // Initialiser le chat
    setupChatInfo();
    showStep('step-chat');
    
    // Vérifier si la clé API est configurée
    if (!apiKey) {
        // Afficher la notification pour demander la clé
        document.getElementById('api-key-notice').classList.add('show');
        return;
    }
    
    // Masquer la notification si la clé existe
    document.getElementById('api-key-notice').classList.remove('show');
    
    // Envoyer le premier message
    sendInitialPrompt();
}

// Configurer les informations du chat
function setupChatInfo() {
    document.getElementById('chat-student-name').textContent = appData.studentName;
    document.getElementById('chat-subject').textContent = appData.subject;
    document.getElementById('chat-topic').textContent = appData.topic;
    document.getElementById('chat-activity').textContent = appData.activity;
    
    // Déterminer le type d'activité
    if (appData.activity.includes('Comprendre')) {
        currentActivityType = 'comprendre';
    } else if (appData.activity.includes('entraîner')) {
        currentActivityType = 'entrainer';
    } else {
        currentActivityType = 'evaluer';
    }
    saveData();
}

// Sauvegarder la clé API
function saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    if (key) {
        apiKey = key;
        localStorage.setItem('openai_api_key', key);
        document.getElementById('api-key-notice').classList.remove('show');
        // Message de confirmation
        displayMessage('assistant', '✅ Clé API enregistrée avec succès ! Elle sera automatiquement utilisée lors de vos prochaines visites.');
        sendInitialPrompt();
    } else {
        alert('Merci de saisir une clé API valide !');
    }
}

// Envoyer le prompt initial
async function sendInitialPrompt() {
    const prompt = generateDetailedPrompt();
    conversationHistory = [{
        role: 'system',
        content: prompt
    }];
    
    await sendToOpenAI();
    updateActionButtons();
}

// Générer le prompt détaillé selon l'activité
function generateDetailedPrompt() {
    let systemPrompt = `Tu es un assistant pédagogique ${appData.tone} et bienveillant. Tu t'adresses à ${appData.studentName}, un élève en ${appData.level}.`;
    
    if (currentActivityType === 'comprendre') {
        systemPrompt += `\n\nTa mission : Explique de manière claire et pédagogique le sujet "${appData.topic}" en ${appData.subject}. Structure ton explication avec :
- Une introduction simple
- Les concepts clés expliqués avec des exemples concrets
- Des analogies adaptées au niveau ${appData.level}
- Des schémas ou visualisations en texte si pertinent

Adapte ton vocabulaire au niveau ${appData.level}. Sois patient et encourageant.`;
    } else if (currentActivityType === 'entrainer') {
        systemPrompt += `\n\nTa mission : Propose des exercices progressifs sur "${appData.topic}" en ${appData.subject} pour le niveau ${appData.level}.
- Commence par 3 exercices simples
- Attends que l'élève réponde avant de donner la correction
- Sois encourageant et explique les erreurs de manière constructive
- Adapte la difficulté selon les réponses de l'élève

Présente un exercice à la fois et attends la réponse de ${appData.studentName}.`;
    } else if (currentActivityType === 'evaluer') {
        systemPrompt += `\n\nTa mission : Aider ${appData.studentName} à préparer une évaluation sur "${appData.topic}" en ${appData.subject} (niveau ${appData.level}).

Commence par :
1. Un rappel des 5-7 points les plus importants à retenir sur ce sujet
2. Des conseils méthodologiques pour ce type d'évaluation

Ensuite, propose des exercices classiques posés dans ce type d'évaluation :
- Commence par des questions de cours
- Puis des exercices d'application
- Termine par un exercice de synthèse

Attends les réponses de l'élève avant de corriger. Sois bienveillant et constructif.`;
    }
    
    systemPrompt += `\n\nTon de communication : ${getToneName(appData.tone)}\nReste toujours pédagogue et adapte-toi au niveau de compréhension de l'élève.`;
    
    return systemPrompt;
}

// Envoyer un message à OpenAI
async function sendToOpenAI() {
    const messagesDiv = document.getElementById('chat-messages');
    const loadingMsg = document.getElementById('loading-message');
    
    if (loadingMsg) {
        loadingMsg.style.display = 'block';
        // Scroll vers le bas pour afficher le message de chargement
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: (typeof CONFIG !== 'undefined' && CONFIG.MODEL) ? CONFIG.MODEL : 'gpt-4',
                messages: conversationHistory,
                temperature: (typeof CONFIG !== 'undefined' && CONFIG.TEMPERATURE) ? CONFIG.TEMPERATURE : 0.7,
                max_tokens: (typeof CONFIG !== 'undefined' && CONFIG.MAX_TOKENS) ? CONFIG.MAX_TOKENS : 2000
            })
        });
        
        if (!response.ok) {
            throw new Error('Erreur API : ' + response.status);
        }
        
        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });
        
        saveData();
        
        if (loadingMsg) {
            loadingMsg.style.display = 'none';
        }
        
        displayMessage('assistant', assistantMessage);
        
    } catch (error) {
        console.error('Erreur:', error);
        if (loadingMsg) {
            loadingMsg.style.display = 'none';
        }
        displayMessage('assistant', `❌ Oups ! Une erreur s'est produite : ${error.message}\n\nVérifie ta clé API dans les paramètres.`);
        document.getElementById('api-key-notice').classList.add('show');
    }
}

// Afficher un message dans le chat
function displayMessage(sender, content) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(time);
    messagesDiv.appendChild(messageDiv);
    
    // Scroll vers le bas
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Envoyer un message utilisateur
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Afficher le message de l'utilisateur
    displayMessage('user', message);
    input.value = '';
    
    // Ajouter à l'historique
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    // Envoyer à l'API
    await sendToOpenAI();
}

// Permettre d'envoyer avec Enter
document.getElementById('chat-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mettre à jour les boutons d'action selon l'activité
function updateActionButtons() {
    const buttonsDiv = document.getElementById('action-buttons');
    buttonsDiv.innerHTML = '';
    
    if (currentActivityType === 'comprendre') {
        addActionButton('🎥 Voir des vidéos', () => searchVideos());
        addActionButton('📚 Aller plus loin', () => goDeeper());
        addActionButton('❓ Poser une question', () => focusInput('J\'ai une question : '));
    } else if (currentActivityType === 'entrainer') {
        addActionButton('😊 Exercices plus faciles', () => changeExerciseDifficulty('facile'));
        addActionButton('🔥 Exercices plus difficiles', () => changeExerciseDifficulty('difficile'));
        addActionButton('💡 Demander un indice', () => askHint());
        addActionButton('✅ Voir la correction', () => showCorrection());
    } else if (currentActivityType === 'evaluer') {
        addActionButton('📋 Revoir les points clés', () => reviewKeyPoints());
        addActionButton('🎥 Voir des vidéos', () => searchVideos());
        addActionButton('😊 Exercices plus faciles', () => changeExerciseDifficulty('facile'));
        addActionButton('🔥 Exercices plus difficiles', () => changeExerciseDifficulty('difficile'));
        addActionButton('✅ Correction détaillée', () => showCorrection());
    }
}

// Ajouter un bouton d'action
function addActionButton(label, callback) {
    const buttonsDiv = document.getElementById('action-buttons');
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.textContent = label;
    btn.onclick = callback;
    buttonsDiv.appendChild(btn);
}

// Fonctions des boutons d'action
function searchVideos() {
    const query = `${appData.topic} ${appData.subject} ${appData.level}`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' cours')}`;
    window.open(youtubeUrl, '_blank');
    displayMessage('assistant', `🎥 J'ai ouvert une recherche de vidéos sur YouTube pour "${appData.topic}". Tu peux regarder plusieurs vidéos pour mieux comprendre !`);
}

function goDeeper() {
    conversationHistory.push({
        role: 'user',
        content: `J'aimerais aller plus loin sur ce sujet. Peux-tu m'expliquer des aspects plus avancés ou des applications concrètes de "${appData.topic}" ?`
    });
    sendToOpenAI();
}

function changeExerciseDifficulty(level) {
    const levelText = level === 'facile' ? 'plus simples et progressifs' : 'plus complexes et challengeants';
    conversationHistory.push({
        role: 'user',
        content: `Peux-tu me proposer des exercices ${levelText} sur "${appData.topic}" ?`
    });
    sendToOpenAI();
}

function askHint() {
    conversationHistory.push({
        role: 'user',
        content: 'Peux-tu me donner un indice pour résoudre cet exercice, sans me donner la réponse complète ?'
    });
    sendToOpenAI();
}

function showCorrection() {
    conversationHistory.push({
        role: 'user',
        content: 'Peux-tu me donner la correction détaillée avec les explications ?'
    });
    sendToOpenAI();
}

function reviewKeyPoints() {
    conversationHistory.push({
        role: 'user',
        content: `Peux-tu me rappeler les points essentiels à retenir sur "${appData.topic}" pour mon évaluation ?`
    });
    sendToOpenAI();
}

function focusInput(text) {
    const input = document.getElementById('chat-input');
    input.value = text;
    input.focus();
}

// Changer d'activité
function changeActivity() {
    // Sauvegarder la conversation actuelle avant de changer
    const previousConversation = [...conversationHistory];
    
    // Créer une modal temporaire pour choisir la nouvelle activité
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'activity-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🔄 Changer d'activité</h2>
                <button class="btn-close-modal" onclick="closeActivityModal()">✕</button>
            </div>
            <div class="modal-body">
                <p>Que souhaites-tu faire maintenant sur <strong>${appData.topic}</strong> en <strong>${appData.subject}</strong> ?</p>
                <div class="activity-cards-compact" style="margin-top: 20px;">
                    <div class="activity-card-compact" onclick="switchToActivity('comprendre')">
                        <div class="activity-icon-compact">📖</div>
                        <h4>Comprendre une leçon</h4>
                    </div>
                    
                    <div class="activity-card-compact" onclick="switchToActivity('entrainer')">
                        <div class="activity-icon-compact">✏️</div>
                        <h4>M'entraîner sur des exercices</h4>
                    </div>
                    
                    <div class="activity-card-compact" onclick="switchToActivity('evaluer')">
                        <div class="activity-icon-compact">🎯</div>
                        <h4>Préparer une évaluation</h4>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeActivityModal()">Annuler</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Fermer la modal d'activité
function closeActivityModal() {
    const modal = document.getElementById('activity-modal');
    if (modal) {
        modal.remove();
    }
}

// Basculer vers une nouvelle activité
async function switchToActivity(activityType) {
    const activityNames = {
        'comprendre': 'Comprendre une leçon',
        'entrainer': 'M\'entraîner sur des exercices',
        'evaluer': 'Préparer une évaluation'
    };
    
    // Fermer la modal immédiatement
    closeActivityModal();
    
    // Mettre à jour l'activité
    appData.activity = activityNames[activityType];
    currentActivityType = activityType;
    saveData();
    
    // Mettre à jour l'affichage
    document.getElementById('chat-activity').textContent = appData.activity;
    
    // Ajouter un message de transition dans le chat
    displayMessage('assistant', `🔄 Parfait ! Nous allons maintenant ${activityNames[activityType].toLowerCase()}. Je prépare cela pour toi...`);
    
    // Créer un nouveau contexte système avec la nouvelle activité
    const newSystemPrompt = generateDetailedPrompt();
    
    // Ajouter une instruction de transition
    conversationHistory.push({
        role: 'user',
        content: `Je souhaite maintenant ${activityNames[activityType].toLowerCase()} sur le sujet "${appData.topic}".`
    });
    
    // Mettre à jour le contexte système
    if (conversationHistory[0].role === 'system') {
        conversationHistory[0].content = newSystemPrompt;
    } else {
        conversationHistory.unshift({
            role: 'system',
            content: newSystemPrompt
        });
    }
    
    // Envoyer à l'API pour obtenir la réponse adaptée
    await sendToOpenAI();
    
    // Mettre à jour les boutons d'action
    updateActionButtons();
}

// Nouvelle session
function newSession() {
    if (confirm('Es-tu sûr(e) de vouloir commencer une nouvelle session ? La conversation actuelle sera perdue.')) {
        conversationHistory = [];
        currentActivityType = '';
        saveData();
        goToStep1();
    }
}

// Toggle menu dropdown
function toggleMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const dropdown = document.getElementById('menu-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Fermer le menu si on clique ailleurs
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('menu-dropdown');
        const menuButton = document.getElementById('menu-button');
        
        if (dropdown && menuButton) {
            // Si le clic n'est pas sur le bouton menu ou le dropdown
            if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        }
    });
});

// Ouvrir les réglages
function openSettings() {
    // Pré-remplir avec les données actuelles
    document.getElementById('settings-name').value = appData.studentName || '';
    document.getElementById('settings-tone').value = appData.tone || 'amical';
    document.getElementById('settings-level').value = appData.level || '';
    document.getElementById('settings-api-key').value = apiKey || '';
    
    document.getElementById('settings-modal').classList.add('show');
}

// Fermer les réglages
function closeSettings() {
    document.getElementById('settings-modal').classList.remove('show');
}

// Sauvegarder les réglages
function saveSettings() {
    const name = document.getElementById('settings-name').value.trim();
    const tone = document.getElementById('settings-tone').value;
    const level = document.getElementById('settings-level').value;
    const newApiKey = document.getElementById('settings-api-key').value.trim();
    
    let messages = [];
    
    if (name) {
        appData.studentName = name;
        messages.push('Nom mis à jour');
    }
    if (tone) {
        appData.tone = tone;
        messages.push('Ton mis à jour');
    }
    if (level) {
        appData.level = level;
        messages.push('Classe mise à jour');
    }
    if (newApiKey && newApiKey !== apiKey) {
        apiKey = newApiKey;
        localStorage.setItem('openai_api_key', newApiKey);
        messages.push('Clé API enregistrée (sauvegardée sur cet appareil)');
    }
    
    saveData();
    
    // Mettre à jour l'affichage si on est dans le chat
    if (document.getElementById('step-chat').classList.contains('active')) {
        setupChatInfo();
    }
    
    closeSettings();
    
    const message = messages.length > 0 
        ? '✅ Réglages enregistrés :\n' + messages.join('\n')
        : '✅ Réglages enregistrés !';
    alert(message);
}

// Effacer toutes les données
function clearAllData() {
    if (confirm('⚠️ Es-tu sûr(e) de vouloir effacer toutes les données ? Cette action est irréversible.')) {
        localStorage.clear();
        appData = {
            studentName: '',
            tone: '',
            level: '',
            subject: '',
            topic: '',
            activity: ''
        };
        conversationHistory = [];
        currentActivityType = '';
        apiKey = '';
        closeSettings();
        goToStep1();
        alert('✅ Toutes les données ont été effacées.');
    }
}

// Fermer la modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('settings-modal');
    if (event.target === modal) {
        closeSettings();
    }
}

// Permettre la saisie libre de matière/sujet au lieu de la sélection
document.getElementById('custom-subject')?.addEventListener('input', function() {
    if (this.value.trim()) {
        document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('selected'));
    }
});

document.getElementById('custom-topic')?.addEventListener('input', function() {
    if (this.value.trim()) {
        document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('selected'));
    }
});
