import React, { useState, useEffect } from 'react';
import { Market } from '../types';
import { analyzeMarket } from '../services/geminiService';
import { Sparkles, RefreshCcw, AlertTriangle, Cpu } from 'lucide-react';

interface AIInsightProps {
  market: Market;
}

export const AIInsight: React.FC<AIInsightProps> = ({ market }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeMarket(market);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    setAnalysis(null);
  }, [market.id]);

  return (
    <div className="bg-gradient-to-br from-indigo-900/30 to-futuro-card border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden shadow-lg min-h-[200px]">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500/20 p-1.5 rounded-lg">
             <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-futuro-text">Análise IA Gemini</h3>
        </div>
        {!analysis && !loading && (
          <button 
            onClick={handleAnalyze}
            className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
          >
            <Sparkles className="w-3 h-3" />
            Gerar Insights
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-4 animate-pulse relative z-10">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
              <div className="h-4 bg-indigo-500/10 rounded w-3/4"></div>
           </div>
           <div className="space-y-2 pl-5">
              <div className="h-3 bg-futuro-surface rounded w-full"></div>
              <div className="h-3 bg-futuro-surface rounded w-5/6"></div>
              <div className="h-3 bg-futuro-surface rounded w-4/6"></div>
           </div>
           
           <div className="flex items-center gap-3 mt-4 mb-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
              <div className="h-4 bg-indigo-500/10 rounded w-1/2"></div>
           </div>
           <div className="space-y-2 pl-5">
              <div className="h-3 bg-futuro-surface rounded w-full"></div>
              <div className="h-3 bg-futuro-surface rounded w-11/12"></div>
           </div>
        </div>
      )}

      {analysis && !loading && (
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="prose prose-invert prose-sm max-w-none text-futuro-muted leading-relaxed whitespace-pre-line marker:text-indigo-400">
            {analysis.replace(/\*\*/g, '')} 
          </div>
          <div className="mt-5 pt-4 border-t border-futuro-border/50 flex justify-between items-center">
             <p className="text-[10px] text-futuro-muted/60 flex items-center gap-1.5 uppercase tracking-wide font-medium">
               <AlertTriangle className="w-3 h-3" />
               Conteúdo gerado por IA. Não é recomendação financeira.
             </p>
             <button 
               onClick={handleAnalyze}
               className="text-xs text-futuro-muted hover:text-futuro-text flex items-center gap-1.5 transition-colors"
             >
               <RefreshCcw className="w-3 h-3" /> Regenerar
             </button>
          </div>
        </div>
      )}

      {!analysis && !loading && (
        <p className="text-sm text-futuro-muted/80 relative z-10 leading-relaxed">
          Utilize inteligência artificial para identificar rapidamente os vetores altistas e baixistas deste evento antes de realizar sua operação.
        </p>
      )}
    </div>
  );
};