import React, { useState } from 'react';
import { DANCE_ELEMENTS } from '../constants';
import { Category, DanceElement, Difficulty, Section, Variation } from '../types';
import { generateElementVariations, generateCreativeIdea } from '../services/geminiService';
import { Filter, Info, Play, Image as ImageIcon, Gauge, ChevronRight, Sparkles, Box, Zap, Search, X, Loader2, Bot, Lightbulb } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.DEPART);
  const [selectedElement, setSelectedElement] = useState<DanceElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Generation State for Element Details
  const [aiExamples, setAiExamples] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // AI Generation State for Random Inductor in Library
  const [aiInductor, setAiInductor] = useState<{title: string, desc: string} | null>(null);
  const [isLoadingInductor, setIsLoadingInductor] = useState(false);

  // Reset AI state when closing modal or changing element
  const openElement = (el: DanceElement) => {
    setSelectedElement(el);
    setAiExamples([]);
    setIsLoadingAi(false);
  };

  const handleGenerateAiExamples = async () => {
    if (!selectedElement) return;
    setIsLoadingAi(true);
    try {
      const examples = await generateElementVariations(selectedElement.name, selectedElement.category);
      setAiExamples(examples);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleGenerateGlobalIdea = async () => {
    setIsLoadingInductor(true);
    setAiInductor(null);
    try {
      const idea = await generateCreativeIdea('inducteur');
      setAiInductor(idea);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingInductor(false);
    }
  };

  // Filtre principal : Par section OU par recherche globale
  const filteredElements = DANCE_ELEMENTS.filter(el => {
    const matchesSearch = searchQuery.toLowerCase().trim() === '' 
      ? true 
      : el.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        el.variations.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        el.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== '') {
      return matchesSearch; // Si recherche active, on ignore les onglets de section
    }
    return el.section === activeSection;
  });

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.NIVEAU_1: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case Difficulty.NIVEAU_2: return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case Difficulty.NIVEAU_3: return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getSectionIcon = (section: Section) => {
    switch (section) {
      case Section.DEPART: return Sparkles;
      case Section.TRANSFORMATION: return Box;
      case Section.ENRICHISSEMENT: return Zap;
    }
  };

  const sortVariations = (variations: Variation[]) => {
    const order = { [Difficulty.NIVEAU_1]: 1, [Difficulty.NIVEAU_2]: 2, [Difficulty.NIVEAU_3]: 3 };
    return [...variations].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">La Bibliothèque de Danse</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un procédé, un inducteur, une nuance..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 placeholder:text-slate-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Section Tabs (Hidden if searching) */}
      {!searchQuery && (
        <div className="flex flex-col sm:flex-row gap-2">
          {Object.values(Section).map((section) => {
            const Icon = getSectionIcon(section);
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                  isActive 
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-bold text-xs sm:text-sm">{section}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Instruction Banner */}
      {!searchQuery && (
        <div className="bg-slate-800/50 border border-dashed border-slate-600 rounded-lg p-3 flex gap-3 items-start animate-in fade-in">
          <Info className="text-rose-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-slate-300">
            {activeSection === Section.DEPART && "Trouvez l'inspiration parmi les lieux, les objets, les histoires ou les émotions."}
            {activeSection === Section.TRANSFORMATION && "Les outils techniques pour composer : Accumuler, Inverser, Mettre en Canon..."}
            {activeSection === Section.ENRICHISSEMENT && "Le vocabulaire pour préciser les qualités du mouvement (Corps, Espace, Temps, Énergie)."}
          </p>
        </div>
      )}

      {/* Grid of Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* SPECIAL AI CARD FOR INDUCTORS */}
        {!searchQuery && activeSection === Section.DEPART && (
          <div className="bg-indigo-900/20 border border-indigo-500/40 rounded-xl p-4 hover:border-indigo-400 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between shadow-lg shadow-indigo-900/10">
             <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider bg-indigo-950/50 px-2 py-1 rounded border border-indigo-500/30">
                    IA GÉNÉRATIVE
                  </span>
                  <Bot size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">Inspiration Surprise</h3>
                <p className="text-indigo-200/70 text-sm mb-4">
                  Vous ne trouvez pas votre bonheur ? Laissez l'intelligence artificielle inventer un inducteur unique pour vous.
                </p>
             </div>

             {aiInductor ? (
               <div className="bg-indigo-950/80 p-3 rounded-lg border border-indigo-500/30 animate-in fade-in slide-in-from-bottom-2">
                 <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                   <Lightbulb size={12} className="text-yellow-400"/>
                   {aiInductor.title}
                 </h4>
                 <p className="text-xs text-slate-300 italic">"{aiInductor.desc}"</p>
                 <button 
                   onClick={(e) => { e.stopPropagation(); handleGenerateGlobalIdea(); }}
                   className="text-[10px] text-indigo-300 hover:text-white underline mt-2 w-full text-center"
                 >
                   Générer une autre idée
                 </button>
               </div>
             ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleGenerateGlobalIdea(); }}
                  disabled={isLoadingInductor}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoadingInductor ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16} />}
                  Générer une idée
                </button>
             )}
          </div>
        )}

        {filteredElements.length > 0 ? (
          filteredElements.map((element) => (
            <div 
              key={element.id} 
              onClick={() => openElement(element)}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-rose-500/50 transition-all cursor-pointer group relative overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-950/30 px-2 py-1 rounded border border-rose-900/50 line-clamp-1">
                  {element.category}
                </span>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors flex-shrink-0 ml-2" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 relative z-10 leading-tight">{element.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2 relative z-10 flex-1">{element.description}</p>
              
              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-500">
                <div className="flex -space-x-1">
                  {[...Array(Math.min(3, element.variations.length))].map((_, i) => (
                     <div key={i} className="w-2 h-2 rounded-full bg-slate-600 ring-2 ring-slate-800"></div>
                  ))}
                </div>
                <span>{element.variations.length} exemples / niveaux</span>
              </div>
            </div>
          ))
        ) : (
          !(!searchQuery && activeSection === Section.DEPART) && (
            <div className="col-span-full text-center py-12 text-slate-500">
              <p>Aucun résultat trouvé pour "{searchQuery}".</p>
              <button onClick={() => setSearchQuery('')} className="text-rose-400 text-sm mt-2 hover:underline">Effacer la recherche</button>
            </div>
          )
        )}
      </div>

      {/* Detail Modal */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4" onClick={() => setSelectedElement(null)}>
          <div className="bg-slate-900 border border-slate-700 sm:rounded-2xl w-full max-w-2xl h-full sm:h-[85vh] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-rose-900/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2 border border-rose-900/50">
                    {selectedElement.section}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">{selectedElement.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedElement(null)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">{selectedElement.description}</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              <h4 className="text-sm font-semibold text-slate-400 uppercase mb-4 flex items-center gap-2 sticky top-0 bg-slate-900 py-2 z-0">
                <Filter size={16} />
                Exemples & Niveaux
              </h4>
              
              <div className="space-y-4 mb-8">
                {sortVariations(selectedElement.variations).map((variation, idx) => (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
                    <div className="flex flex-col sm:flex-row">
                      
                      {/* Media Thumbnail (Placeholder logic) */}
                      {variation.mediaUrl ? (
                        <div className="sm:w-1/3 h-32 sm:h-auto relative bg-black group cursor-pointer">
                          <img 
                            src={variation.mediaUrl} 
                            alt={variation.name} 
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                              {variation.mediaType === 'video' ? <Play size={20} className="text-white ml-1"/> : <ImageIcon size={20} className="text-white"/>}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="hidden sm:flex sm:w-16 bg-slate-800 items-center justify-center border-r border-slate-700/50">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4 flex-1">
                        <div className="flex flex-wrap gap-2 mb-2 items-start justify-between">
                          <h5 className="text-lg font-bold text-slate-100">{variation.name}</h5>
                          <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold uppercase tracking-wide whitespace-nowrap ${getDifficultyColor(variation.difficulty)}`}>
                            {variation.difficulty}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {variation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Suggestions Section */}
              <div className="border-t border-slate-800 pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-indigo-400 uppercase flex items-center gap-2">
                      <Sparkles size={16} />
                      Besoin de plus d'idées ?
                    </h4>
                  </div>
                  
                  {aiExamples.length === 0 ? (
                     <button 
                      onClick={handleGenerateAiExamples}
                      disabled={isLoadingAi}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-indigo-500/50 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-all group disabled:opacity-50"
                    >
                      {isLoadingAi ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <Bot size={18} />
                          Générer d'autres exemples avec l'IA
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                       {aiExamples.map((ex, i) => (
                         <div key={i} className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl flex gap-3">
                            <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                              <Sparkles size={12} />
                            </div>
                            <p className="text-sm text-indigo-100">{ex}</p>
                         </div>
                       ))}
                       <button 
                        onClick={handleGenerateAiExamples}
                        className="text-xs text-slate-500 hover:text-white underline text-center w-full mt-2"
                       >
                         Régénérer d'autres idées
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
