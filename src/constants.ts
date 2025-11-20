import { Category, DanceElement, Difficulty, EvaluationCriteria, Section } from './types';

// Listes d'aides pour la création (Menus déroulants rapides)
export const PARAMETERS_OPTIONS = {
  SPACE: ['Niveau Haut', 'Niveau Bas', 'Au Sol', 'Extension', 'Regroupé', 'Diagonale', 'Cercle', 'Loin', 'Proche', 'Symétrie', 'Asymétrie', 'Trajet Direct', 'Trajet Courbe', 'Sur place'],
  TIME: ['Ralenti', 'Accéléré', 'Arrêt/Silence', 'Saccadé', 'Pulsé', 'Continu', 'Vite', 'Canon', 'Polyrythmie', 'Unisson', 'Décalé', 'Ostinato', 'Progressif'],
  ENERGY: ['Fluide', 'Lourd', 'Léger', 'Sec', 'Explosif', 'Tendu', 'Relâché', 'Vibratoire', 'Suspendu', 'Percussif', 'Mou', 'Rebondi', 'Frotté', 'Caressé'],
  RELATION: ['Unisson', 'Canon', 'Miroir', 'Contraste', 'Contact', 'Regard', 'Action/Réaction', 'Porté', 'Contrepoint', 'Question/Réponse', 'Opposition', 'Imitation', 'Poursuite']
};

export const DANCE_ELEMENTS: DanceElement[] = [
  // ===========================================================================
  // SECTION 1: POINT DE DÉPART (INDUCTEURS)
  // ===========================================================================
  
  {
    id: 'ind_lieux_env',
    name: 'Lieux & Environnements',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "Danser 'dans' un lieu spécifique transforme le corps et l'énergie.",
    variations: [
      { name: 'Nature Extrême', description: 'Volcan, Désert, Océan, Grotte, Banquise, Ruisseau.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Lieux Urbains', description: 'Sur les toits, Métro bondé, Parcours de construction.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Lieux Imaginaires', description: 'Château hanté, Forêt enchantée, Temple antique, Labyrinthe, Jardin de sculptures.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Parcs & Loisirs', description: 'Parc d\'attractions, Zoo, Patinoire, Piscine, Parcours d\'accrobranche.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Environnements Spatiaux', description: 'Planètes (Mars, Lune), Étoiles, Constellations.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'ind_nature_vivant',
    name: 'Le Vivant (Animaux & Nature)',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "S'inspirer des qualités de mouvement du vivant.",
    variations: [
      { name: 'Animaux Sauvages', description: 'Lions, Tigres, Ours, Singes (Lourd/Puissant).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Insectes', description: 'Abeilles, Papillons, Fourmis, Araignées (Vif/Menu/Grouillant).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Végétaux', description: 'Fleurs (Ouverture), Arbres (Enracinement), Algues (Fluidité), Cactus (Piquant).', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Dinosaures', description: 'T-Rex, Diplodocus, Raptor (Lourd/Saccadé).', difficulty: Difficulty.NIVEAU_1 }
    ]
  },
  {
    id: 'ind_culture_histoire',
    name: 'Culture, Histoire & Personnages',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "S'appuyer sur une narration ou une référence culturelle.",
    variations: [
      { name: 'Personnages de Fiction', description: 'Harry Potter, Star Wars, Super-héros, Pirates.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Créatures Légendaires', description: 'Fées, Lutins, Monstres, Dieux Grecs, Sirènes.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Époques', description: 'Préhistoire, Égypte Antique, Moyen Âge, Années 80, Futur.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Métiers', description: 'Policier, Médecin, Sportif, Artiste, Soldat.', difficulty: Difficulty.NIVEAU_1 }
    ]
  },
  {
    id: 'ind_objets_accessoires',
    name: 'Objets & Accessoires',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "L'objet comme partenaire ou contrainte.",
    variations: [
      { name: 'Accessoires Portés', description: 'Chapeaux, Gants, Lunettes, Masques, Écharpes, Capes.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Objets Manipulés', description: 'Bâtons, Cerceaux, Ballons, Tissus, Élastiques, Chaises.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Objets Imaginaires', description: 'Mimer un objet lourd, brûlant, précieux, invisible.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'ind_abstrait_sensations',
    name: 'Sensations & Abstrait',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "Partir d'une couleur, d'une émotion ou d'un concept.",
    variations: [
      { name: 'Émotions', description: 'Joie, Colère, Peur, Tristesse, Surprise, Dégoût.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Couleurs', description: 'Rouge (Feu/Sang), Bleu (Eau/Ciel), Vert (Nature/Espoir), Noir (Ombre).', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Éléments', description: 'Eau, Terre, Air, Feu, Glace.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Concepts', description: 'Ombre & Lumière, Vide & Plein, Chaos & Ordre.', difficulty: Difficulty.NIVEAU_3 }
    ]
  },
  {
    id: 'ind_styles_tech',
    name: 'Styles & Techniques',
    section: Section.DEPART,
    category: Category.INDUCTEUR,
    description: "S'inspirer de codes chorégraphiques existants ou d'autres arts.",
    variations: [
      { name: 'Styles de Danse', description: 'Hip-Hop (Pop/Lock), Classique, Jazz, Contemporain, Flamenco, Salsa.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Arts du Spectacle', description: 'Mime, Cirque (Jonglage/Acrobatie), Théâtre.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Pratiques Corporelles', description: 'Yoga, Arts Martiaux, Tai Chi, Méditation.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },

  // ===========================================================================
  // SECTION 2: PROCÉDÉS DE COMPOSITION (TRANSFORMATION)
  // ===========================================================================
  
  // --- TEMPS & RYTHME ---
  {
    id: 'proc_canon',
    name: 'Le Canon',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Décalage temporel d'un même mouvement.",
    variations: [
      { name: 'Canon Simple', description: 'Le danseur B part quand A a fini.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Canon Chevauché', description: 'Le danseur B part pendant que A danse.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Canon Accumulatif', description: 'A, puis A+B, puis A+B+C.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'proc_vitesse',
    name: 'Vitesse & Durée',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Jouer sur l'étirement ou la compression du temps.",
    variations: [
      { name: 'Ralenti / Slow Motion', description: 'Comme dans un film, décomposer chaque micro-mouvement.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Accélération', description: 'De plus en plus vite jusqu\'à la rupture.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Arrêt / Freeze', description: 'Suspension soudaine du mouvement.', difficulty: Difficulty.NIVEAU_1 }
    ]
  },
  {
    id: 'proc_repetition',
    name: 'Répétition',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Refaire pour insister ou créer une transe.",
    variations: [
      { name: 'Répétition Simple', description: 'Faire le geste 3 fois de suite.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Répétition Variée', description: 'Répéter en changeant d\'espace ou d\'énergie.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Ostinato', description: 'Répétition d\'un motif rythmique en boucle.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'proc_accumulation',
    name: 'Accumulation',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Construction additive type '1', '1+2', '1+2+3'.",
    variations: [
      { name: 'Accumulation Gestuelle', description: 'J\'ajoute un geste à la phrase à chaque passage.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Accumulation de Danseurs', description: 'Un danseur commence, les autres rejoignent un par un.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Accumulation Rythmique', description: 'Ajout progressif de sons ou de percussions corporelles.', difficulty: Difficulty.NIVEAU_3 }
    ]
  },

  // --- ESPACE & GROUPE ---
  {
    id: 'proc_miroir',
    name: 'Miroir & Symétrie',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Travail en duo ou groupe sur le reflet.",
    variations: [
      { name: 'Miroir Face à Face', description: 'Suivre son partenaire comme son ombre.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Miroir Décalé', description: 'Même gestuelle mais dos à dos ou à distance.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Inversion', description: 'Symétrie axiale (Droite devient Gauche).', difficulty: Difficulty.NIVEAU_3 }
    ]
  },
  {
    id: 'proc_cascade',
    name: 'Cascade',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Transmission du mouvement en chaîne.",
    variations: [
      { name: 'La Vague', description: 'Le mouvement se propage d\'un bout à l\'autre du groupe.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Dominos', description: 'Chute ou déséquilibre transmis au voisin.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Ricochet', description: 'Le mouvement rebondit dans l\'espace entre les danseurs.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'proc_relation',
    name: 'Relations & Contacts',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Interaction physique ou visuelle.",
    variations: [
      { name: 'Unisson', description: 'Tous ensemble, exactement pareil.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Dialogue', description: 'Question (Geste A) / Réponse (Geste B).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Lâché / Rattrapé', description: 'Confiance et gestion du poids de l\'autre.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Contrepoint', description: 'Deux phrases différentes qui s\'imbriquent.', difficulty: Difficulty.NIVEAU_3 }
    ]
  },

  // --- COMPOSITION AVANCÉE ---
  {
    id: 'proc_transformation',
    name: 'Transformations & Variations',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Modifier la nature même du mouvement.",
    variations: [
      { name: 'Amplification / Diminution', description: 'Rendre le geste immense ou minuscule.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Fragmentation', description: 'Hacher le mouvement, le rendre robotique.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Métamorphose', description: 'Le geste change progressivement de sens (ex: caresse devient frappe).', difficulty: Difficulty.NIVEAU_3 },
      { name: 'Fusion', description: 'Mélanger deux gestes pour en créer un troisième.', difficulty: Difficulty.NIVEAU_3 }
    ]
  },
  {
    id: 'proc_collage',
    name: 'Collage & Rupture',
    section: Section.TRANSFORMATION,
    category: Category.PROCEDE,
    description: "Assemblage non-linéaire.",
    variations: [
      { name: 'Collage', description: 'Mettre bout à bout des gestes sans lien logique.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Contraste', description: 'Alterner brutalement (Vite/Lent, Haut/Bas, Fluide/Sec).', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Isolation', description: 'Ne bouger qu\'une partie du corps en fixant le reste.', difficulty: Difficulty.NIVEAU_1 }
    ]
  },


  // ===========================================================================
  // SECTION 3: LES DOMINANTES (ENRICHISSEMENT)
  // ===========================================================================
  
  {
    id: 'dom_corps',
    name: 'Le Corps',
    section: Section.ENRICHISSEMENT,
    category: Category.CORPS,
    description: "Mise en jeu des segments corporels.",
    variations: [
      { name: 'Segments Isolés', description: 'Tête, Épaules, Cage thoracique, Bassin.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Globalité', description: 'Mouvement impliquant tout le corps (Extension).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Posture', description: 'Fermée (Repli), Ouverte (Projection), Tordue.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Appuis', description: 'Pieds, Genoux, Mains, Dos, Fesses.', difficulty: Difficulty.NIVEAU_1 }
    ]
  },
  {
    id: 'dom_espace',
    name: 'L\'Espace',
    section: Section.ENRICHISSEMENT,
    category: Category.ESPACE,
    description: "Occupation de la scène et volume du geste.",
    variations: [
      { name: 'Niveaux', description: 'Haut (Saut), Moyen (Debout), Bas (Sol).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Directions', description: 'Avant, Arrière, Côté, Diagonales.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Kinesphère', description: 'Proche (Intime), Lointain (Projection).', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Tracés', description: 'Direct, Courbe, Sinueux, Angulaire.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'dom_temps',
    name: 'Le Temps',
    section: Section.ENRICHISSEMENT,
    category: Category.TEMPS,
    description: "Musicalité et durée.",
    variations: [
      { name: 'Pulsation', description: 'Suivre le beat de la musique.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Silence', description: 'Danser sur le silence / Immobilité active.', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Vitesse', description: 'Vite, Lent, Accélération, Décélération.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Rythme', description: 'Régulier vs Irrégulier.', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'dom_energie',
    name: 'L\'Énergie',
    section: Section.ENRICHISSEMENT,
    category: Category.ENERGIE,
    description: "Qualité et intention du mouvement.",
    variations: [
      { name: 'Poids', description: 'Lourd (Terrien), Léger (Aérien).', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Flux', description: 'Libre (Laisser aller), Contrôlé (Retenu).', difficulty: Difficulty.NIVEAU_2 },
      { name: 'Tension', description: 'Mou, Tonique, Raide.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Attaque', description: 'Soudaine (Percussif), Progressive (Fondu).', difficulty: Difficulty.NIVEAU_2 }
    ]
  },
  {
    id: 'dom_relation',
    name: 'La Relation',
    section: Section.ENRICHISSEMENT,
    category: Category.RELATION,
    description: "Lien aux autres et à l'environnement.",
    variations: [
      { name: 'Regard', description: 'Focus précis, Regard périphérique, Yeux fermés.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Contact', description: 'Toucher, Porter, Repousser.', difficulty: Difficulty.NIVEAU_1 },
      { name: 'Écoute', description: 'Réagir aux autres, respirer ensemble.', difficulty: Difficulty.NIVEAU_2 }
    ]
  }
];

export const DEFAULT_CRITERIA: EvaluationCriteria[] = [
  { id: 'crit1', category: 'Conception', label: "Pertinence de l'Inducteur (Le point de départ est lisible)", maxPoints: 4, currentScore: 0 },
  { id: 'crit2', category: 'Conception', label: "Utilisation des Procédés (Variété et complexité des choix)", maxPoints: 4, currentScore: 0 },
  { id: 'crit3', category: 'Réalisation', label: "Maîtrise des Nuances (Espace, Temps, Énergie)", maxPoints: 4, currentScore: 0 },
  { id: 'crit4', category: 'Réalisation', label: "Engagement Corporel & Mémorisation", maxPoints: 4, currentScore: 0 },
  { id: 'crit5', category: 'Analyse', label: "Justification des choix artistiques", maxPoints: 4, currentScore: 0 },
];

export const SYSTEM_INSTRUCTION = `
Tu es un professeur expert de "Danse d'expression" au Lycée Chevalier d'Eon.
Ta mission est d'aider les élèves de Seconde dans leur démarche de composition chorégraphique.

LA DÉMARCHE PÉDAGOGIQUE :
1. **L'Inducteur** : Le point de départ (Image, Lieu, Objet, Émotion...).
2. **Le Matériau** : Des gestes simples (Verbes d'action).
3. **Les Procédés** : Les outils de transformation (Canon, Miroir, Accumulation, Inversion...).
4. **Les Dominantes** : Les nuances (Espace, Temps, Énergie).

TON RÔLE :
- Suggérer des inducteurs originaux si l'élève sèche parmi la liste (Lieux, Animaux, Objets, Émotions...).
- Expliquer les procédés de composition (ex: "Le Canon, c'est comme 'Frère Jacques' mais avec le corps").
- Aider à enrichir une séquence en proposant des variations de vitesse, de niveau ou d'énergie.
- Encourager l'élève à justifier ses choix ("Pourquoi as-tu choisi le ralenti ici ?").

RÈGLES :
- Sois bienveillant, encourageant et concis.
- Utilise le vocabulaire spécifique (Inducteur, Procédé, Dominante, Kinesphère, Flux...).
`;
