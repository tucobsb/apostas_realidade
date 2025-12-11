import React from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-futuro-text mb-2">Ranking de Traders</h1>
        <p className="text-futuro-muted">Os maiores estrategistas do Futuro.</p>
      </div>

      <div className="bg-futuro-card border border-futuro-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 bg-futuro-surface/50 p-4 text-xs font-bold text-futuro-muted uppercase tracking-wider border-b border-futuro-border">
          <div className="col-span-2 md:col-span-1 text-center">#</div>
          <div className="col-span-6 md:col-span-7">Trader</div>
          <div className="col-span-4 md:col-span-4 text-right">Lucro Total</div>
        </div>

        {entries.map((entry, index) => {
          let rankIcon = null;
          let rowClass = "border-b border-futuro-border/50 hover:bg-futuro-surface/20 transition-colors";
          let rankColor = "text-futuro-muted";

          if (entry.rank === 1) {
            rankIcon = <Trophy className="w-5 h-5 text-yellow-400" />;
            rowClass = "bg-gradient-to-r from-yellow-500/20 to-transparent border-b border-yellow-500/30 hover:from-yellow-500/30 hover:bg-white/5 transition-all";
            rankColor = "text-yellow-400";
          } else if (entry.rank === 2) {
            rankIcon = <Medal className="w-5 h-5 text-slate-300" />;
            rowClass = "bg-gradient-to-r from-slate-400/20 to-transparent border-b border-slate-400/30 hover:from-slate-400/30 hover:bg-white/5 transition-all";
            rankColor = "text-slate-200";
          } else if (entry.rank === 3) {
            rankIcon = <Medal className="w-5 h-5 text-amber-600" />;
            rowClass = "bg-gradient-to-r from-amber-700/20 to-transparent border-b border-amber-700/30 hover:from-amber-700/30 hover:bg-white/5 transition-all";
            rankColor = "text-amber-600";
          }
          
          const isPositive = entry.profit >= 0;
          const profitColor = isPositive ? 'text-futuro-success' : 'text-futuro-danger';
          const ProfitIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div key={index} className={`grid grid-cols-12 p-4 items-center ${rowClass}`}>
              <div className={`col-span-2 md:col-span-1 flex justify-center font-bold text-lg ${rankColor}`}>
                {rankIcon || entry.rank}
              </div>
              <div className="col-span-6 md:col-span-7 flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${entry.rank <= 3 ? 'bg-futuro-bg border border-futuro-border' : 'bg-futuro-surface text-futuro-text'}`}>
                    {entry.username.substring(0, 2).toUpperCase()}
                 </div>
                 <div>
                   <span className={`font-bold block ${entry.rank <= 3 ? 'text-futuro-text text-base' : 'text-futuro-text text-sm'}`}>{entry.username}</span>
                   <div className={`flex md:hidden text-[10px] items-center gap-0.5 ${profitColor}`}>
                      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} 
                      {entry.roi}% ROI
                   </div>
                 </div>
              </div>
              <div className="col-span-4 md:col-span-4 text-right">
                <div className={`font-mono font-bold flex items-center justify-end gap-1.5 ${profitColor}`}>
                   <ProfitIcon className="w-3 h-3 opacity-50 hidden sm:block" />
                   {isPositive ? '+' : ''}R$ {entry.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className={`hidden md:flex justify-end text-xs items-center gap-1 mt-0.5 ${profitColor}`}>
                   <span className="font-bold">{entry.roi > 0 ? '+' : ''}{entry.roi}%</span> ROI
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};