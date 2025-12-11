import React from 'react';
import { User, Market } from '../types';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { MarketChart } from './MarketChart';

interface PortfolioProps {
  user: User;
  markets: Market[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ user, markets }) => {
  const totalValue = user.balance + user.portfolioValue;
  const totalReturn = user.positions.reduce((acc, pos) => acc + pos.pnl, 0);
  const totalInvested = user.portfolioValue; // Simplified
  const totalROI = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  // Mock chart data for portfolio history
  const historyData = [
      { timestamp: '2024-01-01', price: 0.8 },
      { timestamp: '2024-01-02', price: 0.82 },
      { timestamp: '2024-01-03', price: 0.85 },
      { timestamp: '2024-01-04', price: 0.83 },
      { timestamp: '2024-01-05', price: 0.88 },
      { timestamp: '2024-01-06', price: 0.92 },
      { timestamp: '2024-01-07', price: 0.95 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-futuro-text mb-6">Minha Carteira</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6">
          <div className="flex items-center gap-2 text-futuro-muted mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Valor Total</span>
          </div>
          <div className="text-3xl font-bold text-futuro-text">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-futuro-muted mt-1">Saldo + Posições</div>
        </div>

        <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6">
          <div className="flex items-center gap-2 text-futuro-muted mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Lucro / Prejuízo (P&L)</span>
          </div>
          <div className={`text-3xl font-bold ${totalReturn >= 0 ? 'text-futuro-success' : 'text-futuro-danger'}`}>
            {totalReturn >= 0 ? '+' : ''}R$ {totalReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-futuro-muted mt-1">Retorno total acumulado</div>
        </div>

        <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6">
           <div className="flex items-center gap-2 text-futuro-muted mb-2">
            <PieChart className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Retorno % (ROI)</span>
          </div>
          <div className={`text-3xl font-bold ${totalROI >= 0 ? 'text-futuro-success' : 'text-futuro-danger'}`}>
            {totalROI >= 0 ? '+' : ''}{totalROI.toFixed(2)}%
          </div>
           <div className="text-xs text-futuro-muted mt-1">Rentabilidade sobre o investido</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-futuro-card border border-futuro-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-futuro-text mb-6">Performance Histórica</h3>
          <div className="h-64">
            <MarketChart data={historyData} color="#facc15" />
          </div>
        </div>

        {/* Allocation/Stats placeholder */}
        <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 flex flex-col justify-center items-center text-center">
             <div className="w-32 h-32 rounded-full border-8 border-futuro-surface border-t-futuro-primary border-r-futuro-success relative mb-4">
               <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-futuro-text">
                 {user.positions.length}
               </div>
             </div>
             <p className="text-futuro-text font-bold">Posições Abertas</p>
             <p className="text-sm text-futuro-muted">Diversificação da carteira</p>
        </div>
      </div>

      {/* Positions List */}
      <div>
        <h3 className="text-xl font-bold text-futuro-text mb-4">Posições Abertas</h3>
        <div className="space-y-4">
          {user.positions.map((pos, idx) => {
             const market = markets.find(m => m.id === pos.marketId);
             if (!market) return null;

             const currentValue = pos.quantity * pos.currentPrice;
             const invested = pos.quantity * pos.avgPrice;
             const profit = currentValue - invested;
             const percent = (profit / invested) * 100;

             return (
               <div key={idx} className="bg-futuro-card border border-futuro-border rounded-xl p-5 hover:border-futuro-primary/30 transition-all flex flex-col md:flex-row justify-between items-center gap-4">
                 
                 <div className="flex items-center gap-4 flex-1 w-full">
                    <img src={market.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                       <h4 className="text-futuro-text font-bold text-sm md:text-base">{market.title}</h4>
                       <div className="flex gap-2 text-xs mt-1">
                          <span className={`font-bold px-1.5 py-0.5 rounded ${pos.side === 'SIM' ? 'bg-futuro-success/20 text-futuro-success' : 'bg-futuro-danger/20 text-futuro-danger'}`}>
                            {pos.side}
                          </span>
                          <span className="text-futuro-muted">{pos.quantity} cotas</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-between w-full md:w-auto md:gap-12">
                    <div className="text-right">
                       <p className="text-xs text-futuro-muted uppercase">Preço Médio</p>
                       <p className="text-futuro-text font-mono">R$ {pos.avgPrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-futuro-muted uppercase">Atual</p>
                       <p className="text-futuro-text font-mono">R$ {pos.currentPrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                       <p className="text-xs text-futuro-muted uppercase">Lucro</p>
                       <p className={`font-bold font-mono flex items-center justify-end gap-1 ${profit >= 0 ? 'text-futuro-success' : 'text-futuro-danger'}`}>
                         {profit >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                         R$ {Math.abs(profit).toFixed(2)}
                       </p>
                       <p className={`text-[10px] ${profit >= 0 ? 'text-futuro-success' : 'text-futuro-danger'}`}>
                         {profit >= 0 ? '+' : ''}{percent.toFixed(1)}%
                       </p>
                    </div>
                 </div>

               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};