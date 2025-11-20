import { GoogleGenAI, Chat, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

export const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const createDanceCoachChat = (): Chat => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });
};

export const generateChoreographySuggestion = async (theme: string, constraints: string[]): Promise<string> => {
  const ai = getAiClient();
  const prompt = `
    Thème: ${theme}
    Contraintes imposées: ${constraints.join(', ')}
    
    Propose une séquence de 4 mouvements enchainés qui respecte ce thème et ces contraintes.
    Décris chaque mouvement avec : Action (Verbe), Espace, Temps, Énergie.
    Format: Liste à puces.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text || "Désolé, je n'ai pas pu générer de suggestion pour le moment.";
  } catch (error) {
    console.error("Error generating choreography:", error);
    return "Erreur lors de la connexion au coach virtuel. Vérifiez la clé API.";
  }
};

// --- NOUVELLES FONCTIONS POUR LA BIBLIOTHÈQUE ET LA CRÉATION ---

export const generateElementVariations = async (elementName: string, category: string): Promise<string[]> => {
  const ai = getAiClient();
  const prompt = `
    Tu es un professeur de danse. Donne-moi 3 idées d'exercices ou de variations originales et concrètes pour travailler : "${elementName}" (Catégorie: ${category}) avec des élèves de lycée.
    Sois bref, précis et imaginatif.
    Format attendu : Une liste simple de 3 points, sans introduction ni conclusion.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    
    const text = response.text || "";
    // Nettoyage basique pour récupérer une liste
    return text.split('\n').filter(line => line.trim().length > 5).map(line => line.replace(/^[-\d*.]+\s*/, ''));
  } catch (error) {
    console.error("Error generating variations:", error);
    return ["Impossible de générer des exemples (Vérifiez la clé API)."];
  }
};

export const generateCreativeIdea = async (type: 'inducteur' | 'procédé'): Promise<{title: string, desc: string}> => {
  const ai = getAiClient();
  
  // Définition du prompt spécifique
  const prompt = type === 'inducteur' 
    ? "Propose une idée d'Inducteur (thème de départ) très originale pour une chorégraphie de lycée. Donne un Titre court et une description inspirante en une phrase."
    : "Propose une idée créative pour transformer un geste simple (Procédé de composition) de manière originale. Donne un Titre court et une consigne précise en une phrase.";

  try {
    // Utilisation du responseSchema pour garantir le format JSON avec les bonnes clés
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Le titre de l'idée ou du thème" },
            description: { type: Type.STRING, description: "La description détaillée ou la consigne" }
          },
          required: ["title", "description"]
        }
      }
    });

    // Parsing direct puisque le schéma garantit le format
    const jsonStr = response.text || "{}";
    const json = JSON.parse(jsonStr);
    
    return { 
      title: json.title || "Idée Générée", 
      desc: json.description || "Description non disponible." 
    };

  } catch (error) {
    console.error("Erreur génération idée:", error);
    return { title: "Erreur", desc: "Le coach n'est pas joignable (Vérifiez la clé API)." };
  }
};
