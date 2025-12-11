import React, { useState } from 'react';
import { Market, User } from '../types';
import { ArrowUpRight, Wallet, Zap, AlertTriangle } from 'lucide-react';

interface TradePanelProps {
  market: Market;
  user: User;
  onTrade: (marketId: string, side: 'SIM' | 'NÃO', amount: number) => void;
}

export const TradePanel: React.FC<TradePanelProps> = ({ market, user, onTrade }) => {
  const [side, setSide] = useState<'SIM' | 'NÃO'>('SIM');
  const [amount, setAmount] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const price = side === 'SIM' ? market.yesPrice : market.noPrice;
  // Preço da cota é sempre R$ 1.00 no vencimento
  const potentialShares = amount ? Math.floor(parseFloat(amount) / price) : 0;
  const potentialReturn = potentialShares * 1.00; 
  const potentialProfit = potentialReturn - (amount ? parseFloat(amount) : 0);
  const roi = amount ? (potentialProfit / parseFloat(amount)) * 100 : 0;

  const quickBets = [50, 100, 200, 500];

  const handleTradeClick = () => {
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance) return;
    setShowConfirmation(true);
  };

  const confirmTrade = () => {
    if (!amount) return;
    onTrade(market.id, side, parseFloat(amount));
    setAmount('');
    setShowConfirmation(false);
  };

  const handleQuickBet = (val: number) => {
    setAmount(val.toString());
  };

  return (
    <>
      <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 h-fit sticky top-24 shadow-xl relative z-10">
        <h3 className="text-lg font-bold text-futuro-text mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-futuro-primary" />
          Negociar
        </h3>

        <div className="flex bg-futuro-bg rounded-xl p-1.5 mb-6 border border-futuro-border">
          <button
            onClick={() => setSide('SIM')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex flex-col items-center ${
              side === 'SIM' 
                ? 'bg-futuro-success text-futuro-bg shadow-md' 
                : 'text-futuro-muted hover:text-futuro-text hover:bg-futuro-surface/50'
            }`}
          >
            <span>COMPRAR SIM</span>
            <span className="text-xs font-normal opacity-90 mt-0.5">R$ {market.yesPrice.toFixed(2)}</span>
          </button>
          <button
            onClick={() => setSide('NÃO')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex flex-col items-center ${
              side === 'NÃO' 
                ? 'bg-futuro-danger text-white shadow-md' 
                : 'text-futuro-muted hover:text-futuro-text hover:bg-futuro-surface/50'
            }`}
          >
            <span>COMPRAR NÃO</span>
            <span className="text-xs font-normal opacity-90 mt-0.5">R$ {market.noPrice.toFixed(2)}</span>
          </button>
        </div>

        <div className="space-y-5 mb-6">
          <div>
            <label className="text-xs font-semibold text-futuro-muted mb-2 block uppercase tracking-wide flex justify-between">
              <span>Valor do Aporte (R$)</span>
              {amount && <span className="text-futuro-primary animate-pulse flex items-center gap-1"><Zap className="w-3 h-3"/> Rápido</span>}
            </label>
            
            <div className="relative group mb-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-futuro-muted font-bold group-focus-within:text-futuro-primary transition-colors">R$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-futuro-bg border border-futuro-border rounded-xl py-3 pl-11 pr-4 text-futuro-text font-mono focus:outline-none focus:border-futuro-primary focus:ring-1 focus:ring-futuro-primary transition-all"
                placeholder="0,00"
              />
            </div>

            {/* Quick Bet Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              {quickBets.map(val => (
                <button
                  key={val}
                  onClick={() => handleQuickBet(val)}
                  className="py-2 bg-futuro-surface border border-futuro-border rounded-lg text-xs font-bold text-futuro-muted hover:text-futuro-text hover:border-futuro-primary hover:bg-futuro-surface/80 transition-all active:scale-95"
                >
                  {val}
                </button>
              ))}
               <button 
                  onClick={() => setAmount(user.balance.toString())}
                  className="py-2 bg-futuro-surface border border-futuro-border rounded-lg text-xs font-bold text-futuro-primary hover:bg-futuro-primary hover:text-futuro-bg transition-all active:scale-95"
                >
                  MAX
                </button>
            </div>

            <div className="text-right text-xs text-futuro-muted">
               <span>Disponível: R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          
          <div className="bg-futuro-surface/50 rounded-xl p-4 space-y-3 border border-futuro-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-futuro-muted">Cotas Estimadas</span>
              <span className="text-futuro-text font-mono">{potentialShares}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-futuro-muted">Retorno Potencial</span>
              <span className="text-futuro-success font-bold font-mono">R$ {potentialReturn.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm items-center pt-2 border-t border-futuro-border/30">
              <span className="text-futuro-muted">ROI</span>
              <span className={`font-bold flex items-center gap-1 ${roi > 0 ? 'text-futuro-success' : 'text-futuro-muted'}`}>
                <ArrowUpRight className="w-3 h-3" />
                {roi.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleTradeClick}
          disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance}
          className={`w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all shadow-lg ${
            !amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance
              ? 'bg-futuro-surface text-futuro-muted cursor-not-allowed border border-futuro-border'
              : side === 'SIM' 
                ? 'bg-futuro-success hover:bg-green-400 text-futuro-bg shadow-futuro-success/20' 
                : 'bg-futuro-danger hover:bg-rose-400 text-white shadow-futuro-danger/20'
          }`}
        >
          Revisar Ordem
        </button>
        <p className="text-[10px] text-futuro-muted text-center mt-4 opacity-70">
          Ao negociar, você concorda com os Termos de Uso e Regras de Liquidação.
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirmation(false)}
          ></div>
          <div className="relative bg-futuro-card border border-futuro-border rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="flex items-center gap-2 mb-4 text-futuro-primary">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-xl font-bold text-futuro-text">Confirmar Operação</h3>
             </div>
             
             <div className="bg-futuro-bg rounded-xl p-4 border border-futuro-border space-y-3 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-futuro-border/50">
                    <span className="text-xs text-futuro-muted uppercase tracking-wider font-bold">Mercado</span>
                </div>
                <p className="text-sm font-medium text-futuro-text leading-tight mb-4">{market.title}</p>

                <div className="grid grid-cols-2 gap-y-3 pt-2">
                  <div>
                    <span className="text-xs text-futuro-muted block mb-0.5">Posição</span>
                    <span className={`text-sm font-black px-2 py-0.5 rounded ${side === 'SIM' ? 'bg-futuro-success/20 text-futuro-success' : 'bg-futuro-danger/20 text-futuro-danger'}`}>
                      {side}
                    </span>
                  </div>
                   <div>
                    <span className="text-xs text-futuro-muted block mb-0.5 text-right">Preço da Cota</span>
                    <span className="text-sm font-mono font-bold text-futuro-text block text-right">R$ {price.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-futuro-muted block mb-0.5">Custo Estimado</span>
                    <span className="text-sm font-mono font-bold text-futuro-text">R$ {parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-futuro-muted block mb-0.5 text-right">Cotas</span>
                    <span className="text-sm font-mono font-bold text-futuro-text block text-right">{potentialShares}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-futuro-border/50 mt-2">
                    <span className="text-xs text-futuro-muted uppercase font-bold">Retorno Estimado</span>
                    <span className="text-lg font-mono font-bold text-futuro-success">R$ {potentialReturn.toFixed(2)}</span>
                </div>
             </div>

             <div className="flex gap-3">
               <button 
                 onClick={() => setShowConfirmation(false)}
                 className="flex-1 px-4 py-3 bg-futuro-surface hover:bg-futuro-surface/80 text-futuro-text font-bold rounded-xl transition-colors border border-futuro-border"
               >
                 Cancelar
               </button>
               <button 
                 onClick={confirmTrade}
                 className="flex-1 px-4 py-3 bg-futuro-primary hover:bg-yellow-300 text-futuro-bg font-bold rounded-xl transition-colors shadow-lg shadow-futuro-primary/20"
               >
                 Confirmar
               </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export const TradePanelSkeleton: React.FC = () => {
  return (
    <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 h-fit sticky top-24 shadow-xl relative z-10 animate-pulse">
      <div className="h-6 bg-futuro-surface/50 rounded w-1/3 mb-4"></div>

      <div className="flex gap-1 mb-6">
         <div className="flex-1 h-12 bg-futuro-surface/50 rounded-lg"></div>
         <div className="flex-1 h-12 bg-futuro-surface/50 rounded-lg"></div>
      </div>

      <div className="space-y-5 mb-6">
         <div>
            <div className="flex justify-between mb-2">
               <div className="h-4 bg-futuro-surface/30 rounded w-1/4"></div>
               <div className="h-4 bg-futuro-surface/30 rounded w-1/6"></div>
            </div>
            
            <div className="h-12 bg-futuro-surface/50 rounded-xl w-full"></div>
            
            <div className="grid grid-cols-5 gap-2 mt-2">
               {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-futuro-surface/30 rounded-lg"></div>)}
            </div>
         </div>
         
         <div className="bg-futuro-surface/30 rounded-xl p-4 h-24 border border-futuro-border/20"></div>
      </div>

      <div className="h-14 bg-futuro-surface/50 rounded-xl w-full"></div>
    </div>
  );
};