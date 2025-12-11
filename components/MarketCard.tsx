import React from 'react';
import { Market } from '../types';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onClick: (market: Market) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const probability = Math.round(market.yesPrice * 100);
  
  return (
    <div 
      onClick={() => onClick(market)}
      className="group bg-futuro-card border border-futuro-border rounded-2xl p-0 cursor-pointer hover:border-futuro-primary/50 transition-all hover:shadow-2xl hover:shadow-futuro-primary/5 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
    >
      <div className="h-32 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-futuro-card to-transparent z-10"></div>
        <img src={market.imageUrl} alt="cover" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 z-20">
           <span className="bg-futuro-bg/80 backdrop-blur text-xs font-bold text-futuro-primary px-2 py-1 rounded-md border border-futuro-primary/20 uppercase tracking-wide">
             {market.category}
           </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-futuro-primary transition-colors">
            {market.title}
          </h3>
          <p className="text-sm text-futuro-muted line-clamp-2">
            {market.description}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-futuro-muted mb-1">
             <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Vol: R$ {(market.volume/1000).toFixed(0)}k</span>
             <span>Expira: {new Date(market.endDate).toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-futuro-surface rounded-lg p-2.5 border border-futuro-border flex justify-between items-center group/yes hover:bg-futuro-successDim hover:border-futuro-success/30 transition-all">
              <span className="text-xs text-futuro-success font-bold uppercase">SIM</span>
              <span className="text-base font-bold text-white">{probability}%</span>
            </div>
            <div className="flex-1 bg-futuro-surface rounded-lg p-2.5 border border-futuro-border flex justify-between items-center group/no hover:bg-futuro-dangerDim hover:border-futuro-danger/30 transition-all">
              <span className="text-xs text-futuro-danger font-bold uppercase">NÃO</span>
              <span className="text-base font-bold text-white">{100 - probability}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};