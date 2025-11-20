import React, { useState, useEffect, useRef } from 'react';
import { createDanceCoachChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from '../components/Button';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { Chat, GenerateContentResponse } from "@google/genai";

export const CoachView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bonjour ! Je suis ton coach de danse virtuel. Je peux t'aider à trouver des idées de mouvements, structurer ta chorégraphie ou travailler sur une émotion. Que veux-tu créer aujourd'hui ?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat only once
    if (!chatRef.current) {
      chatRef.current = createDanceCoachChat();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !chatRef.current) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatRef.current.sendMessage({ message: userText });
      const modelText = result.text || "Désolé, je n'ai pas compris.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Erreur de connexion au service IA. Vérifiez votre clé API.", isError: true }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
       <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-white">Coach Virtuel</h2>
            <p className="text-xs text-slate-400">Powered by Gemini</p>
          </div>
       </div>

       <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-rose-400"/>
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-rose-600 text-white rounded-tr-none' 
                      : msg.isError 
                        ? 'bg-red-900/50 border border-red-700 text-red-200 rounded-tl-none'
                        : 'bg-slate-700 text-slate-100 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-slate-300"/>
                    </div>
                  )}
               </div>
             ))}
             {isLoading && (
               <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <Bot size={16} className="text-rose-400"/>
                  </div>
                  <div className="bg-slate-700 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-slate-800 border-t border-slate-700">
             <div className="relative flex items-center gap-2">
               <input 
                  type="text" 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Demander une idée de variation..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-full px-4 py-3 text-sm text-white focus:border-rose-500 focus:outline-none placeholder:text-slate-500"
               />
               <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-rose-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-700 transition-colors"
               >
                 <Send size={18} />
               </button>
             </div>
             <p className="text-[10px] text-slate-500 text-center mt-2">
               L'IA peut faire des erreurs. Vérifiez toujours avec votre professeur.
             </p>
          </div>
       </div>
    </div>
  );
};
