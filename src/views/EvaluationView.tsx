import React, { useState } from 'react';
import { DEFAULT_CRITERIA } from '../constants';
import { EvaluationCriteria } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Trophy, Target } from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>(DEFAULT_CRITERIA);

  const handleScoreChange = (id: string, val: number) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, currentScore: val } : c));
  };

  const totalScore = criteria.reduce((acc, c) => acc + c.currentScore, 0);
  const maxPossible = criteria.reduce((acc, c) => acc + c.maxPoints, 0);
  const percentage = Math.round((totalScore / maxPossible) * 100);

  const chartData = [
    { name: 'Acquis', value: totalScore },
    { name: 'Restant', value: maxPossible - totalScore }
  ];
  
  const COLORS = ['#e11d48', '#1e293b']; // rose-600, slate-800

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Summary Card */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex-1 flex items-center justify-between shadow-lg relative overflow-hidden">
           <div className="z-10">
             <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Note Estimée</h2>
             <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">{totalScore}</span>
                <span className="text-xl text-slate-500">/ {maxPossible}</span>
             </div>
             <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold mt-2 ${percentage >= 50 ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400'}`}>
                <Trophy size={12} />
                {percentage >= 50 ? 'Validé' : 'À améliorer'}
             </div>
           </div>
           
           <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
           </div>
           
           {/* Decorative blur */}
           <div className="absolute right-0 top-0 w-32 h-32 bg-rose-600/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
        </div>

        {/* Advice Box */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex-1 flex flex-col justify-center">
           <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
             <Target size={18} className="text-rose-400"/>
             Objectifs du Cycle
           </h3>
           <p className="text-sm text-slate-400 italic mb-2">
             "Ne pas seulement faire des gestes, mais construire une chorégraphie qui a du sens."
           </p>
           <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
             <li>L'inducteur est-il clair ?</li>
             <li>Les procédés sont-ils visibles ?</li>
             <li>L'interprétation est-elle engagée ?</li>
           </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Grille d'évaluation</h3>
        
        {['Conception', 'Réalisation', 'Analyse'].map(cat => (
          <div key={cat} className="space-y-3">
            <h4 className="text-sm font-bold text-rose-500 uppercase border-b border-slate-700 pb-1">{cat}</h4>
            {criteria.filter(c => c.category === cat).map(criterion => (
              <div key={criterion.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50">
                 <div className="flex justify-between mb-3">
                    <span className="text-slate-200 font-medium text-sm pr-4 leading-tight">{criterion.label}</span>
                    <span className="font-mono text-rose-400 font-bold">{criterion.currentScore}/{criterion.maxPoints}</span>
                 </div>
                 <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                   <div 
                      className="absolute top-0 left-0 h-full bg-rose-600 rounded-full transition-all duration-300"
                      style={{ width: `${(criterion.currentScore / criterion.maxPoints) * 100}%` }}
                   ></div>
                 </div>
                 <input 
                    type="range"
                    min="0"
                    max={criterion.maxPoints}
                    step="0.5"
                    value={criterion.currentScore}
                    onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value))}
                    className="w-full mt-3 h-6 opacity-0 absolute inset-x-0 bottom-2 cursor-pointer"
                    aria-label={`Score pour ${criterion.label}`}
                 />
                 <div className="flex justify-between mt-2">
                   {[...Array(criterion.maxPoints + 1)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => handleScoreChange(criterion.id, i)}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${
                          criterion.currentScore === i 
                            ? 'bg-rose-600 text-white font-bold' 
                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                        }`}
                      >
                        {i}
                      </button>
                   ))}
                 </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
