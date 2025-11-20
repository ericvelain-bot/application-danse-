import React, { useState } from 'react';
import { DANCE_ELEMENTS, PARAMETERS_OPTIONS } from '../constants';
import { Category, Section, SequenceItem, Difficulty } from '../types';
import { Button } from '../components/Button';
import { generateCreativeIdea } from '../services/geminiService';
import { Plus, Trash2, ArrowRight, ArrowLeft, Box, Zap, Sparkles, Settings2, Flag, Edit2, Save, Dices, Shuffle, Lightbulb, Bot, Loader2 } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Identité', desc: 'Le Projet', icon: Flag },
  { id: 2, title: 'Départ', desc: 'L\'Inducteur', icon: Sparkles },
  { id: 3, title: 'Construction', desc: 'Procédés', icon: Box },
  { id: 4, title: 'Nuances', desc: 'Dominantes', icon: Zap },
];

export const CreateView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  // State Global Chorégraphie
  const [project, setProject] = useState({
    title: 'Ma Chorégraphie',
    description: '',
    inducteurId: '',
    inducteurVariation: '' // Stores the specific random variation name
  });
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [tempActionInput, setTempActionInput] = useState('');

  // Helpers
  const inducteurs = DANCE_ELEMENTS.filter(el => el.section === Section.DEPART);
  const procedes = DANCE_ELEMENTS.filter(el => el.section === Section.TRANSFORMATION);
  
  // --- LOGIQUE ALEATOIRE & IA ---
  
  const triggerRandomAnimation = () => {
    setIsRandomizing(true);
    setTimeout(() => setIsRandomizing(false), 500);
  };

  // Step 2: Random Inducteur (Existing)
  const pickRandomInducteur = () => {
    triggerRandomAnimation();
    // Pick random category
    const randomCat = inducteurs[Math.floor(Math.random() * inducteurs.length)];
    // Pick random variation within category
    const randomVar = randomCat.variations[Math.floor(Math.random() * randomCat.variations.length)];
    
    setProject({ 
      ...project, 
      inducteurId: randomCat.id,
      inducteurVariation: randomVar.name
    });
  };

  // Step 2: AI Inducteur Generation
  const handleAiInductor = async () => {
    setIsGeneratingAI(true);
    try {
      const idea = await generateCreativeIdea('inducteur');
      // On utilise un ID fictif pour l'affichage personnalisé
      setProject({
        ...project,
        inducteurId: 'custom_ai',
        inducteurVariation: `${idea.title} : ${idea.desc}`
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Step 3: Random Procede for an item
  const pickRandomProcede = (itemId: string) => {
    triggerRandomAnimation();
    const random = procedes[Math.floor(Math.random() * procedes.length)];
    updateItemProcede(itemId, random.id);
  };

  // Step 4: Random Nuances for an item
  const pickRandomNuances = (itemId: string) => {
    triggerRandomAnimation();
    const pickOne = (arr: string[]) => [arr[Math.floor(Math.random() * arr.length)]];
    
    setSequence(sequence.map(item => {
      if (item.id !== itemId) return item;
      return {
        ...item,
        paramSpace: pickOne(PARAMETERS_OPTIONS.SPACE),
        paramTime: pickOne(PARAMETERS_OPTIONS.TIME),
        paramEnergy: pickOne(PARAMETERS_OPTIONS.ENERGY),
        paramRelation: pickOne(PARAMETERS_OPTIONS.RELATION),
      };
    }));
  };

  // Gestion de la séquence
  const addToSequence = () => {
    if (!tempActionInput.trim()) return;
    
    const newItem: SequenceItem = {
      id: Math.random().toString(36).substr(2, 9),
      actionName: tempActionInput,
      duration: 5,
      paramSpace: [],
      paramTime: [],
      paramEnergy: [],
      paramRelation: [],
      notes: ''
    };
    setSequence([...sequence, newItem]);
    setTempActionInput('');
  };

  const removeFromSequence = (id: string) => {
    setSequence(sequence.filter(item => item.id !== id));
  };

  const updateItemProcede = (id: string, procedeId: string) => {
    setSequence(sequence.map(item => item.id === id ? { ...item, procedeId } : item));
  };

  const updateItemParam = (id: string, paramType: 'paramSpace' | 'paramTime' | 'paramEnergy' | 'paramRelation', value: string) => {
    setSequence(sequence.map(item => {
      if (item.id !== id) return item;
      const currentParams = item[paramType] || [];
      const newParams = currentParams.includes(value)
        ? currentParams.filter(p => p !== value)
        : [...currentParams, value];
      return { ...item, [paramType]: newParams };
    }));
  };

  const getElementName = (id?: string) => DANCE_ELEMENTS.find(e => e.id === id)?.name || 'Aucun';

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  /* -------------------------------------------------------------------------- */
  /*                                VUE ETAPE 1                                 */
  /* -------------------------------------------------------------------------- */
  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Flag className="text-rose-500" />
          Fiche d'Identité
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Titre de la chorégraphie</label>
            <div className="relative">
               <input 
                type="text" 
                value={project.title}
                onChange={e => setProject({...project, title: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none font-bold text-lg pl-10"
              />
              <Edit2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Intention / Argument</label>
            <textarea 
              placeholder="Quelle est l'histoire ? L'émotion ? Ce que vous voulez raconter au public..."
              value={project.description}
              onChange={e => setProject({...project, description: e.target.value})}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-300 focus:border-rose-500 focus:outline-none min-h-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /*                                VUE ETAPE 2                                 */
  /* -------------------------------------------------------------------------- */
  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-end bg-slate-800/50 p-4 rounded-xl border border-slate-700 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Choix de l'Inducteur</h3>
          <p className="text-sm text-slate-400">
            C'est le point de départ. Cliquez sur une catégorie pour voir les exemples.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={pickRandomInducteur}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-bold transition-all active:scale-95 border border-slate-600"
          >
            <Dices size={20} className={isRandomizing ? 'animate-spin' : ''} />
            Hasard
          </button>
          <button 
            onClick={handleAiInductor}
            disabled={isGeneratingAI}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {isGeneratingAI ? <Loader2 size={20} className="animate-spin"/> : <Bot size={20} />}
            Idée IA
          </button>
        </div>
      </div>

      {/* Display Selected Random/Choice/AI */}
      {(project.inducteurId || project.inducteurVariation) && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in zoom-in-95 border ${
          project.inducteurId === 'custom_ai' ? 'bg-indigo-900/30 border-indigo-500/50' : 'bg-rose-900/30 border-rose-500/50'
        }`}>
          <Lightbulb className={project.inducteurId === 'custom_ai' ? 'text-indigo-400' : 'text-yellow-400'} size={24} />
          <div>
            <span className={`text-xs font-bold uppercase ${project.inducteurId === 'custom_ai' ? 'text-indigo-300' : 'text-rose-300'}`}>
              {project.inducteurId === 'custom_ai' ? 'Suggestion de l\'IA' : 'Inducteur Sélectionné'}
            </span>
            <div className="text-lg text-white font-bold">
              {project.inducteurId === 'custom_ai' ? 'Idée Originale' : DANCE_ELEMENTS.find(e => e.id === project.inducteurId)?.name}
              {project.inducteurVariation && <span className="text-slate-200 font-normal"> : {project.inducteurVariation}</span>}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {inducteurs.map(el => (
          <div key={el.id} className={`rounded-xl overflow-hidden border transition-all ${
            project.inducteurId === el.id 
                ? 'bg-slate-800 border-rose-500 shadow-lg shadow-rose-900/20 ring-1 ring-rose-500' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-500'
          }`}>
            <button
              onClick={() => setProject({
                ...project, 
                inducteurId: el.id,
                inducteurVariation: '' // Reset variation if category clicked manually
              })}
              className="w-full text-left p-4"
            >
              <div className="flex justify-between items-center">
                 <span className={`font-bold text-base ${project.inducteurId === el.id ? 'text-rose-400' : 'text-white'}`}>
                   {el.name}
                 </span>
                 {project.inducteurId === el.id && <div className="w-3 h-3 bg-rose-500 rounded-full" />}
              </div>
              <span className="text-xs opacity-60 block mt-1 text-slate-300 line-clamp-1">{el.description}</span>
            </button>
            
            {/* Sub-list of variations if active */}
            {project.inducteurId === el.id && (
              <div className="bg-slate-900/50 border-t border-slate-700 p-3 grid grid-cols-2 gap-2">
                {el.variations.map((v, i) => (
                  <button 
                    key={i}
                    onClick={() => setProject({...project, inducteurVariation: v.name})}
                    className={`text-xs text-left p-2 rounded border transition-colors ${
                      project.inducteurVariation === v.name 
                        ? 'bg-rose-600 text-white border-rose-500' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /*                                VUE ETAPE 3                                 */
  /* -------------------------------------------------------------------------- */
  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <p className="text-sm text-slate-300 mb-4">
          <strong>Méthode :</strong> 1. Je choisis un geste simple (Verbe). <br/>2. J'applique un <strong>Procédé</strong> pour le transformer.
        </p>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Action (ex: Marcher, Frapper, Tourner...)"
            value={tempActionInput}
            onChange={e => setTempActionInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addToSequence()}
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-rose-500 focus:outline-none"
          />
          <Button onClick={addToSequence} disabled={!tempActionInput.trim()}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sequence.length === 0 && (
           <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
             Ajoutez votre premier mouvement ci-dessus.
           </div>
        )}
        
        {sequence.map((item, index) => (
          <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                  <span className="font-bold text-white text-lg">{item.actionName}</span>
                </div>
                <button onClick={() => removeFromSequence(item.id)} className="text-slate-500 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
             </div>

             <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-semibold text-rose-400 uppercase block flex items-center gap-1">
                   <Box size={12} /> Procédé de Composition
                 </label>
                 <button 
                  onClick={() => pickRandomProcede(item.id)}
                  className="text-[10px] flex items-center gap-1 text-indigo-300 hover:text-white bg-indigo-900/50 px-2 py-1 rounded border border-indigo-500/30 hover:bg-indigo-700 transition-colors"
                 >
                   <Dices size={12} className={isRandomizing ? 'animate-spin' : ''}/> Hasard
                 </button>
               </div>
               
               <select 
                 className="w-full bg-slate-800 text-sm text-slate-200 border border-slate-600 rounded p-2 focus:border-rose-500 focus:outline-none"
                 value={item.procedeId || ''}
                 onChange={(e) => updateItemProcede(item.id, e.target.value)}
               >
                 <option value="">-- Aucun (Geste brut) --</option>
                 {procedes.map(p => (
                   <optgroup key={p.id} label={p.name}>
                      <option value={p.id}>{p.name}</option>
                   </optgroup>
                 ))}
               </select>
               {item.procedeId && (
                 <p className="text-[10px] text-slate-400 mt-1 italic">
                   {DANCE_ELEMENTS.find(e => e.id === item.procedeId)?.description}
                 </p>
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /*                                VUE ETAPE 4                                 */
  /* -------------------------------------------------------------------------- */
  const renderStep4 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-2">Enrichissement (Dominantes)</h3>
        <p className="text-sm text-slate-400">
          Pour chaque mouvement, précisez les nuances d'Espace, de Temps, d'Énergie et de Relation.
        </p>
      </div>

      {sequence.length === 0 && (
        <div className="text-center text-slate-500">Aucune séquence à enrichir. Retournez à l'étape précédente.</div>
      )}

      {sequence.map((item, index) => (
        <div key={item.id} className="bg-slate-800 border-l-4 border-l-rose-500 rounded-r-xl p-4 shadow-lg">
           <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
             <div className="flex items-baseline gap-2">
                <span className="text-rose-500 font-bold text-xl">#{index + 1}</span>
                <h4 className="text-white font-bold text-lg">{item.actionName}</h4>
                {item.procedeId && (
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 hidden sm:inline-block">
                    {getElementName(item.procedeId)}
                  </span>
                )}
             </div>
             <button 
                onClick={() => pickRandomNuances(item.id)}
                className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-1.5 rounded flex items-center gap-2 transition-all active:scale-95 shadow-md border border-indigo-500/30"
                title="Générer des nuances aléatoires"
             >
               <Shuffle size={14} className={isRandomizing ? 'animate-spin' : ''} />
               Nuances Surprise
             </button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Espace */}
              <div className="space-y-1">
                 <span className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1"><Settings2 size={10}/> Espace</span>
                 <div className="flex flex-wrap gap-1">
                    {PARAMETERS_OPTIONS.SPACE.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => updateItemParam(item.id, 'paramSpace', opt)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all ${item.paramSpace?.includes(opt) ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Temps */}
              <div className="space-y-1">
                 <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1"><Settings2 size={10}/> Temps</span>
                 <div className="flex flex-wrap gap-1">
                    {PARAMETERS_OPTIONS.TIME.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => updateItemParam(item.id, 'paramTime', opt)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all ${item.paramTime?.includes(opt) ? 'bg-amber-900/50 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Énergie */}
              <div className="space-y-1">
                 <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1"><Settings2 size={10}/> Énergie</span>
                 <div className="flex flex-wrap gap-1">
                    {PARAMETERS_OPTIONS.ENERGY.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => updateItemParam(item.id, 'paramEnergy', opt)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all ${item.paramEnergy?.includes(opt) ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Relation */}
              <div className="space-y-1">
                 <span className="text-xs font-bold text-purple-400 uppercase flex items-center gap-1"><Settings2 size={10}/> Relation</span>
                 <div className="flex flex-wrap gap-1">
                    {PARAMETERS_OPTIONS.RELATION.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => updateItemParam(item.id, 'paramRelation', opt)}
                        className={`text-[10px] px-2 py-1 rounded border transition-all ${item.paramRelation?.includes(opt) ? 'bg-purple-900/50 border-purple-500 text-purple-200' : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'}`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      ))}
    </div>
  );

  /* -------------------------------------------------------------------------- */
  /*                                RENDER GLOBAL                               */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      {/* Progress Bar */}
      <div className="mb-6">
         <div className="flex justify-between mb-2 px-2">
           {STEPS.map((step) => {
             const Icon = step.icon;
             const isActive = currentStep >= step.id;
             const isCurrent = currentStep === step.id;
             return (
               <div key={step.id} className={`flex flex-col items-center ${isActive ? 'text-rose-500' : 'text-slate-600'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-1 transition-all ${
                   isCurrent ? 'bg-rose-600 text-white border-rose-600 scale-110 shadow-lg' : 
                   isActive ? 'bg-slate-900 border-rose-500' : 'bg-slate-900 border-slate-700'
                 }`}>
                   {isActive ? <Icon size={14} /> : <span className="text-xs">{step.id}</span>}
                 </div>
                 <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block">{step.title}</span>
               </div>
             );
           })}
         </div>
         <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
           <div 
             className="h-full bg-rose-600 transition-all duration-500"
             style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
           ></div>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
         {currentStep === 1 && renderStep1()}
         {currentStep === 2 && renderStep2()}
         {currentStep === 3 && renderStep3()}
         {currentStep === 4 && renderStep4()}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-[80px] left-0 w-full px-4 sm:px-0 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-between pointer-events-auto">
          <Button 
            variant="secondary" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="shadow-lg border border-slate-600"
          >
            <ArrowLeft size={18} className="mr-2" /> Précédent
          </Button>

          {currentStep < 4 ? (
            <Button 
              onClick={nextStep}
              className="shadow-lg shadow-rose-900/30"
            >
              Suivant <ArrowRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/30"
              onClick={() => alert("Chorégraphie enregistrée (Simulation)")}
            >
              <Save size={18} className="mr-2" /> Terminer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
