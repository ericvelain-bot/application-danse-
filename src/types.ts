export enum Section {
  DEPART = 'Point de Départ (Inducteurs)',
  TRANSFORMATION = 'Procédés de Composition',
  ENRICHISSEMENT = 'Les Dominantes'
}

export enum Category {
  // Section Départ
  INDUCTEUR = 'Inducteur',
  
  // Section Transformation
  PROCEDE = 'Procédé de Composition',
  
  // Section Enrichissement (Les Dominantes)
  CORPS = 'Le Corps',
  ESPACE = "L'Espace",
  TEMPS = 'Le Temps',
  ENERGIE = "L'Énergie",
  RELATION = 'Relation'
}

export enum Difficulty {
  NIVEAU_1 = 'Niveau 1 (Simple)',
  NIVEAU_2 = 'Niveau 2 (Intermédiaire)',
  NIVEAU_3 = 'Niveau 3 (Complexe)'
}

export interface Variation {
  name: string;
  description: string;
  difficulty: Difficulty;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface DanceElement {
  id: string;
  name: string;
  section: Section;
  category: Category;
  description: string;
  variations: Variation[];
}

export interface SequenceItem {
  id: string;
  actionName: string; // Le geste de base (ex: "Marcher", "Sauter")
  procedeId?: string; // Le procédé de composition appliqué (ex: "Répétition")
  duration: number;
  
  // Les Dominantes (Enrichissement)
  paramSpace?: string[];
  paramTime?: string[];
  paramEnergy?: string[];
  paramRelation?: string[];
  
  notes: string;
}

export interface Choreography {
  id: string;
  title: string;
  description: string; // Description générale
  inducteurId?: string; // L'inducteur choisi (Catégorie)
  inducteurVariation?: string; // Le choix précis (ex: "Volcan")
  sequence: SequenceItem[];
}

export interface EvaluationCriteria {
  id: string;
  category: 'Conception' | 'Réalisation' | 'Analyse';
  label: string;
  maxPoints: number;
  currentScore: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
