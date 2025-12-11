import React, { useState } from 'react';
import { Market } from '../types';
import { BarChart3, Flame, ChevronDown, ChevronUp, Info, Clock } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onClick: (market: Market) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const [showRules, setShowRules] = useState(false);
  const [lastUpdate] = useState(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  
  const probability = Math.round(market.yesPrice * 100);
  const isTrending = market.volume > 2000000;

  const toggleRules = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRules(!showRules);
  };
  
  return (
    <div 
      onClick={() => onClick(market)}
      className="group relative flex flex-col h-full bg-futuro-card border-2 border-futuro-border/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-futuro-primary/40 hover:shadow-xl hover:shadow-futuro-primary/5 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="h-36 w-full relative overflow-hidden bg-futuro-surface/20">
        <img 
          src={market.imageUrl} 
          alt={market.title} 
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-futuro-card via-transparent to-transparent opacity-90"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
           <span className="bg-futuro-card/90 backdrop-blur-md text-[10px] font-bold text-futuro-text px-2.5 py-1 rounded-full border border-futuro-border/50 uppercase tracking-wide shadow-sm">
             {market.category}
           </span>
        </div>

        {isTrending && (
           <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-orange-400 animate-in fade-in zoom-in duration-300">
             <Flame className="w-3 h-3 fill-current" />
             <span className="uppercase tracking-wider">Em Alta</span>
           </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-lg font-bold text-futuro-text leading-snug mb-2 group-hover:text-futuro-primary transition-colors">
            {market.title}
          </h3>
          <p className="text-sm text-futuro-muted line-clamp-2 leading-relaxed font-light">
            {market.description}
          </p>
        </div>

        {/* Collapsible Rules */}
        <div className="relative">
          <button 
            onClick={toggleRules}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-futuro-muted/80 hover:text-futuro-primary transition-colors select-none"
          >
            <Info className="w-3 h-3" />
            {showRules ? 'Ocultar Regras' : 'Ver Detalhes e Regras'}
            {showRules ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showRules ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="p-3 bg-futuro-surface/30 rounded-lg text-xs text-futuro-muted leading-relaxed border border-futuro-border/30"
            >
               <span className="font-bold text-futuro-text block mb-1">Resolução:</span>
               {market.rules}
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-auto space-y-3 pt-2">
          <div className="flex items-center justify-between text-[11px] text-futuro-muted font-medium">
             <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 opacity-70" /> 
                  R$ {(market.volume/1000).toFixed(0)}k Vol
                </span>
             </div>
             <span className="flex items-center gap-1 opacity-70">
                <Clock className="w-3 h-3" /> {lastUpdate}
             </span>
          </div>

          {/* Voting/Probability Bars */}
          <div className="flex gap-2 h-11">
            <div className="relative flex-1 bg-futuro-successDim border border-futuro-success/20 rounded-lg flex items-center justify-between px-3 group/yes hover:bg-futuro-success/20 hover:border-futuro-success/40 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-futuro-success/5 transform -skew-x-12 -translate-x-full group-hover/yes:translate-x-full transition-transform duration-700"></div>
              <span className="text-xs font-bold text-futuro-success/90 uppercase tracking-wider relative z-10">SIM</span>
              <span className="text-lg font-bold text-futuro-text relative z-10">{probability}%</span>
            </div>
            
            <div className="relative flex-1 bg-futuro-dangerDim border border-futuro-danger/20 rounded-lg flex items-center justify-between px-3 group/no hover:bg-futuro-danger/20 hover:border-futuro-danger/40 transition-all overflow-hidden">
               <div className="absolute inset-0 bg-futuro-danger/5 transform -skew-x-12 -translate-x-full group-hover/no:translate-x-full transition-transform duration-700"></div>
              <span className="text-xs font-bold text-futuro-danger/90 uppercase tracking-wider relative z-10">NÃO</span>
              <span className="text-lg font-bold text-futuro-text relative z-10">{100 - probability}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MarketCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-futuro-card border-2 border-futuro-border/50 rounded-xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-36 w-full bg-futuro-surface/40"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <div className="h-6 bg-futuro-surface/50 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-futuro-surface/30 rounded w-full mb-1"></div>
          <div className="h-4 bg-futuro-surface/30 rounded w-2/3"></div>
        </div>

        {/* Rules Toggle Skeleton */}
        <div className="h-4 bg-futuro-surface/30 rounded w-1/3 mt-2"></div>

        {/* Footer Metrics Skeleton */}
        <div className="mt-auto space-y-3 pt-2">
          <div className="flex justify-between">
            <div className="h-3 bg-futuro-surface/30 rounded w-1/4"></div>
            <div className="h-3 bg-futuro-surface/30 rounded w-1/4"></div>
          </div>

          <div className="flex gap-2 h-11">
            <div className="flex-1 bg-futuro-surface/30 rounded-lg"></div>
            <div className="flex-1 bg-futuro-surface/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};