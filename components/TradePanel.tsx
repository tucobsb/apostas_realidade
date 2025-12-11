import React, { useState } from 'react';
import { Market, User } from '../types';
import { ArrowUpRight, Wallet } from 'lucide-react';

interface TradePanelProps {
  market: Market;
  user: User;
  onTrade: (marketId: string, side: 'SIM' | 'NÃO', amount: number) => void;
}

export const TradePanel: React.FC<TradePanelProps> = ({ market, user, onTrade }) => {
  const [side, setSide] = useState<'SIM' | 'NÃO'>('SIM');
  const [amount, setAmount] = useState<string>('');
  
  const price = side === 'SIM' ? market.yesPrice : market.noPrice;
  // Preço da cota é sempre R$ 1.00 no vencimento
  const potentialShares = amount ? Math.floor(parseFloat(amount) / price) : 0;
  const potentialReturn = potentialShares * 1.00; 
  const potentialProfit = potentialReturn - (amount ? parseFloat(amount) : 0);
  const roi = amount ? (potentialProfit / parseFloat(amount)) * 100 : 0;

  const handleTrade = () => {
    if (!amount) return;
    onTrade(market.id, side, parseFloat(amount));
    setAmount('');
  };

  return (
    <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 h-fit sticky top-24 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Wallet className="w-5 h-5 text-futuro-primary" />
        Negociar
      </h3>

      <div className="flex bg-futuro-bg rounded-xl p-1.5 mb-6 border border-futuro-border">
        <button
          onClick={() => setSide('SIM')}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex flex-col items-center ${
            side === 'SIM' 
              ? 'bg-futuro-success text-futuro-bg shadow-md' 
              : 'text-futuro-muted hover:text-white hover:bg-futuro-surface/50'
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
              : 'text-futuro-muted hover:text-white hover:bg-futuro-surface/50'
          }`}
        >
          <span>COMPRAR NÃO</span>
          <span className="text-xs font-normal opacity-90 mt-0.5">R$ {market.noPrice.toFixed(2)}</span>
        </button>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <label className="text-xs font-semibold text-futuro-muted mb-2 block uppercase tracking-wide">Valor do Aporte (R$)</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-futuro-muted font-bold group-focus-within:text-futuro-primary transition-colors">R$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-futuro-bg border border-futuro-border rounded-xl py-3 pl-11 pr-4 text-white font-mono focus:outline-none focus:border-futuro-primary focus:ring-1 focus:ring-futuro-primary transition-all"
              placeholder="0,00"
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-futuro-muted">
             <span>Disponível: R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
             <button onClick={() => setAmount(user.balance.toString())} className="text-futuro-primary font-bold hover:underline cursor-pointer">MAX</button>
          </div>
        </div>
        
        <div className="bg-futuro-surface/50 rounded-xl p-4 space-y-3 border border-futuro-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-futuro-muted">Cotas Estimadas</span>
            <span className="text-white font-mono">{potentialShares}</span>
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
        onClick={handleTrade}
        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance}
        className={`w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all shadow-lg ${
          !amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance
            ? 'bg-futuro-surface text-futuro-muted cursor-not-allowed border border-futuro-border'
            : side === 'SIM' 
              ? 'bg-futuro-success hover:bg-green-400 text-futuro-bg shadow-futuro-success/20' 
              : 'bg-futuro-danger hover:bg-rose-400 text-white shadow-futuro-danger/20'
        }`}
      >
        Confirmar Ordem
      </button>
      <p className="text-[10px] text-futuro-muted text-center mt-4 opacity-70">
        Ao negociar, você concorda com os Termos de Uso e Regras de Liquidação.
      </p>
    </div>
  );
};