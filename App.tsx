import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MarketCard } from './components/MarketCard';
import { MarketChart } from './components/MarketChart';
import { TradePanel } from './components/TradePanel';
import { AIInsight } from './components/AIInsight';
import { MOCK_MARKETS, INITIAL_USER } from './constants';
import { Market, User, Category } from './types';
import { ArrowLeft, Clock, Info, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

// Categorias em PT-BR
const CATEGORIES = ['Todos', ...Object.values(Category)];

export default function App() {
  const [activeMarket, setActiveMarket] = useState<Market | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [user, setUser] = useState<User>(INITIAL_USER);

  const filteredMarkets = selectedCategory === 'Todos' 
    ? MOCK_MARKETS 
    : MOCK_MARKETS.filter(m => m.category === selectedCategory);

  const handleTrade = (marketId: string, side: 'SIM' | 'NÃO', amount: number) => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance - amount,
      portfolioValue: prev.portfolioValue + amount 
    }));
    alert(`Ordem Enviada: R$ ${amount} em ${side} no mercado.`);
  };

  const handleNavigateHome = () => {
    setActiveMarket(null);
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-futuro-bg font-sans text-futuro-text pb-20 selection:bg-futuro-primary selection:text-futuro-bg">
      <Navbar user={user} onNavigateHome={handleNavigateHome} />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        
        {/* MARKET DETAIL VIEW */}
        {activeMarket ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setActiveMarket(null)}
              className="group flex items-center text-sm font-medium text-futuro-muted hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar para Mercados
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Chart & Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                   <div className="flex items-start gap-4 mb-6">
                     <img src={activeMarket.imageUrl} alt="icon" className="w-16 h-16 rounded-2xl object-cover shadow-lg border border-futuro-border" />
                     <div>
                       <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-futuro-primary bg-futuro-primary/10 px-2 py-0.5 rounded border border-futuro-primary/20 uppercase">
                            {activeMarket.category}
                          </span>
                       </div>
                       <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{activeMarket.title}</h1>
                     </div>
                   </div>
                   
                   {/* Main Chart Card */}
                   <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                     <div className="flex justify-between items-end mb-8 relative z-10">
                        <div>
                          <p className="text-futuro-muted text-sm font-medium mb-1 uppercase tracking-wider">Probabilidade "Sim"</p>
                          <p className="text-5xl font-black text-white tracking-tight">{(activeMarket.yesPrice * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex bg-futuro-bg rounded-lg p-1 border border-futuro-border">
                           {['1H', '24H', '7D', '30D', 'Tudo'].map(t => (
                             <button key={t} className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${t === '7D' ? 'bg-futuro-surface text-white shadow-sm' : 'text-futuro-muted hover:text-white'}`}>
                               {t}
                             </button>
                           ))}
                        </div>
                     </div>
                     <MarketChart data={activeMarket.history} color="#4ade80" />
                   </div>
                </div>

                <AIInsight market={activeMarket} />

                {/* Rules Section */}
                <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6">
                   <div className="flex items-center gap-2 mb-4">
                     <Info className="w-5 h-5 text-futuro-muted" />
                     <h3 className="text-lg font-bold text-white">Regras do Mercado</h3>
                   </div>
                   <div className="text-futuro-muted text-sm leading-relaxed space-y-4">
                     <p className="text-base text-white">{activeMarket.rules}</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-futuro-border/50">
                        <div>
                           <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Fonte de Resolução</span>
                           <span className="text-white font-medium">Consenso da mídia ou Órgão Oficial</span>
                        </div>
                        <div>
                           <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Encerramento</span>
                           <div className="flex items-center gap-2 text-white font-medium">
                             <Clock className="w-4 h-4 text-futuro-primary" /> 
                             {new Date(activeMarket.endDate).toLocaleDateString('pt-BR')}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Trading Panel */}
              <div className="space-y-6">
                <TradePanel market={activeMarket} user={user} onTrade={handleTrade} />
                
                {/* Simulated Order Book */}
                <div className="bg-futuro-card border border-futuro-border rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-white mb-4 flex justify-between items-center">
                    Livro de Ofertas
                    <span className="text-[10px] font-normal text-futuro-muted bg-futuro-surface px-2 py-0.5 rounded">Simulado</span>
                  </h4>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-futuro-muted pb-2 mb-2 border-b border-futuro-border/50 uppercase tracking-wider font-sans text-[10px]">
                       <span>Preço (R$)</span>
                       <span>Qtd</span>
                    </div>
                    {[0.99, 0.98, 0.95].map(p => (
                      <div key={p} className="flex justify-between items-center py-1 hover:bg-futuro-surface/50 rounded px-1 transition-colors cursor-pointer group">
                        <span className="text-futuro-success font-bold">R$ {(activeMarket.yesPrice - (1-p)/10).toFixed(2)}</span>
                        <span className="text-futuro-muted group-hover:text-white">{(Math.random() * 50000).toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="py-2 my-1 text-center text-futuro-muted font-sans text-[10px] bg-futuro-bg/50 rounded border border-futuro-border/30 border-dashed">
                       Spread: R$ 0.01
                    </div>
                     {[0.05, 0.15, 0.25].map(p => (
                      <div key={p} className="flex justify-between items-center py-1 hover:bg-futuro-surface/50 rounded px-1 transition-colors cursor-pointer group">
                        <span className="text-futuro-danger font-bold">R$ {(activeMarket.yesPrice + p/10).toFixed(2)}</span>
                        <span className="text-futuro-muted group-hover:text-white">{(Math.random() * 50000).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MARKET LIST VIEW */
          <div className="animate-in fade-in duration-500">
            {/* Hero Header */}
            <div className="mb-12 relative">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-futuro-primary/5 to-transparent blur-3xl -z-10"></div>
               <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                 Preveja o <span className="text-transparent bg-clip-text bg-gradient-to-r from-futuro-primary to-orange-400">Futuro</span>.<br />
                 Lucre com a realidade.
               </h1>
               <p className="text-lg text-futuro-muted max-w-2xl">
                 A primeira plataforma brasileira de mercados preditivos com liquidez institucional e análise por Inteligência Artificial.
               </p>
            </div>

            <div className="sticky top-20 z-40 bg-futuro-bg/95 backdrop-blur py-4 mb-6 border-b border-futuro-border/50">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                <Filter className="w-5 h-5 text-futuro-muted mr-2 shrink-0" />
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                      selectedCategory === cat 
                        ? 'bg-white text-futuro-bg shadow-lg shadow-white/10' 
                        : 'bg-futuro-card border border-futuro-border text-futuro-muted hover:border-futuro-muted hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map(market => (
                <div key={market.id} className="h-full">
                  <MarketCard market={market} onClick={setActiveMarket} />
                </div>
              ))}
              
              {/* Promo Card */}
              <div className="group bg-gradient-to-br from-futuro-primary/10 to-futuro-card border border-futuro-primary/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-5 hover:border-futuro-primary/40 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-futuro-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8 text-futuro-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sugira um Mercado</h3>
                  <p className="text-sm text-futuro-muted">Não encontrou o que procura? Crie sua própria aposta personalizada usando nossa IA.</p>
                </div>
                <button className="px-6 py-3 bg-futuro-primary hover:bg-yellow-300 text-futuro-bg rounded-xl text-sm font-bold transition-colors w-full flex items-center justify-center gap-2">
                  Criar Mercado <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}