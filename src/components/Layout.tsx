import React from 'react';
import { Activity, BookOpen, PenTool, MessageSquare, CheckSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems = [
    { id: 'library', label: 'Bibliothèque', icon: BookOpen },
    { id: 'create', label: 'Création', icon: PenTool },
    { id: 'coach', label: 'Coach IA', icon: MessageSquare },
    { id: 'eval', label: 'Éval', icon: CheckSquare },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-rose-900/20">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-lg tracking-tight text-white leading-tight">Danse d'Expression</h1>
              <p className="text-[10px] text-slate-400 leading-tight">Lycée Chevalier d'Eon • Cycle Seconde • Créateur : Eric Vélain</p>
            </div>
          </div>
          <div className="hidden sm:block text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
            Seconde
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-5xl mx-auto w-full min-h-full p-4 pb-24">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile First) */}
      <nav className="bg-slate-800 border-t border-slate-700 px-2 pb-safe fixed bottom-0 w-full z-20">
        <div className="flex justify-around max-w-5xl mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center py-3 px-2 w-full transition-all duration-200 ${
                  isActive ? 'text-rose-500' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-md' : ''} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
                {isActive && <span className="absolute top-0 w-8 h-0.5 bg-rose-500 rounded-b-full" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
