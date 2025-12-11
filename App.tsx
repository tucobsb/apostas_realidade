import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { Navbar, Tab } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { MarketCard, MarketCardSkeleton } from './components/MarketCard';
import { MarketChart } from './components/MarketChart';
import { TradePanel, TradePanelSkeleton } from './components/TradePanel';
import { AIInsight } from './components/AIInsight';
import { Portfolio } from './components/Portfolio';
import { Leaderboard } from './components/Leaderboard';
import { NewsFeed } from './components/NewsFeed';
import { MOCK_MARKETS, MOCK_NEWS, MOCK_LEADERBOARD } from './constants';
import { Market, Category } from './types';
import { ArrowLeft, Clock, Info, CheckCircle2, ChevronRight, Filter, Lock, SearchX } from 'lucide-react';

const CATEGORIES = ['Todos', ...Object.values(Category)];

const MainContent = () => {
  const { user, loginWithGoogle, isLoading, updateUserBalance, addPosition } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('MARKETS');
  const [activeMarket, setActiveMarket] = useState<Market | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Skeleton Loading States
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Simulate initial fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingMarkets(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic: Category AND Search Term
  const filteredMarkets = MOCK_MARKETS.filter(m => {
    const matchesCategory = selectedCategory === 'Todos' || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTrade = (marketId: string, side: 'SIM' | 'NÃO', amount: number) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // Simulação de Backend para Trade
    const newBalance = user.balance - amount;
    const newPortfolioValue = user.portfolioValue + amount;
    
    // Encontrar o mercado para pegar preço atual (simulação)
    const market = MOCK_MARKETS.find(m => m.id === marketId);
    const currentPrice = side === 'SIM' ? market?.yesPrice || 0.5 : market?.noPrice || 0.5;
    const quantity = Math.floor(amount / currentPrice);

    updateUserBalance(newBalance, newPortfolioValue);
    
    addPosition({
      marketId,
      side,
      quantity,
      avgPrice: currentPrice,
      currentPrice,
      pnl: 0
    });

    // Use Toast instead of alert
    addToast(`Ordem executada! Compra de ${quantity} cotas (${side}) confirmada.`, 'success');
  };

  const handleNavigateHome = () => {
    setActiveMarket(null);
    setActiveTab('MARKETS');
    window.scrollTo(0,0);
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === 'PORTFOLIO' && !user) {
      setIsLoginModalOpen(true);
      return;
    }
    setActiveMarket(null);
    setActiveTab(tab);
    window.scrollTo(0,0);
  };
  
  const handleMarketClick = (market: Market) => {
    setIsLoadingDetails(true);
    setActiveTab('MARKETS');
    setActiveMarket(market);
    window.scrollTo(0,0);
    setTimeout(() => setIsLoadingDetails(false), 800); // Simula carregamento de detalhes
  };
  
  const handleMarketClickFromNews = (market: Market) => {
    handleMarketClick(market);
  }

  // Render Logic based on state
  const renderContent = () => {
    if (activeMarket) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setActiveMarket(null)}
              className="group flex items-center text-sm font-medium text-futuro-muted hover:text-futuro-text mb-6 transition-colors"
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
                       <h1 className="text-3xl md:text-4xl font-extrabold text-futuro-text leading-tight">{activeMarket.title}</h1>
                     </div>
                   </div>
                   
                   <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                     <div className="flex justify-between items-end mb-8 relative z-10">
                        <div>
                          <p className="text-futuro-muted text-sm font-medium mb-1 uppercase tracking-wider">Probabilidade "Sim"</p>
                          <p className="text-5xl font-black text-futuro-text tracking-tight">{(activeMarket.yesPrice * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex bg-futuro-bg rounded-lg p-1 border border-futuro-border">
                           {['1H', '24H', '7D', '30D', 'Tudo'].map(t => (
                             <button key={t} className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${t === '7D' ? 'bg-futuro-surface text-futuro-text shadow-sm' : 'text-futuro-muted hover:text-futuro-text'}`}>
                               {t}
                             </button>
                           ))}
                        </div>
                     </div>
                     <MarketChart data={activeMarket.history} color="#4ade80" />
                   </div>
                </div>

                <AIInsight market={activeMarket} />

                <div className="bg-futuro-card border border-futuro-border rounded-2xl p-6">
                   <div className="flex items-center gap-2 mb-4">
                     <Info className="w-5 h-5 text-futuro-muted" />
                     <h3 className="text-lg font-bold text-futuro-text">Regras do Mercado</h3>
                   </div>
                   <div className="text-futuro-muted text-sm leading-relaxed space-y-4">
                     <p className="text-base text-futuro-text">{activeMarket.rules}</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-futuro-border/50">
                        <div>
                           <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Fonte de Resolução</span>
                           <span className="text-futuro-text font-medium">Consenso da mídia ou Órgão Oficial</span>
                        </div>
                        <div>
                           <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Encerramento</span>
                           <div className="flex items-center gap-2 text-futuro-text font-medium">
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
                {isLoadingDetails ? (
                  <TradePanelSkeleton />
                ) : user ? (
                  <TradePanel market={activeMarket} user={user} onTrade={handleTrade} />
                ) : (
                  <div className="bg-futuro-card border border-futuro-border rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4 sticky top-24">
                     <div className="w-12 h-12 bg-futuro-surface rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-futuro-muted" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-futuro-text">Faça Login para Negociar</h3>
                       <p className="text-sm text-futuro-muted mt-2">Você precisa de uma conta para operar neste mercado.</p>
                     </div>
                     <button 
                       onClick={() => setIsLoginModalOpen(true)}
                       className="w-full bg-white text-futuro-bg font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                     >
                       Entrar agora
                     </button>
                  </div>
                )}
                
                {/* Simulated Order Book */}
                <div className="bg-futuro-card border border-futuro-border rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-futuro-text mb-4 flex justify-between items-center">
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
                        <span className="text-futuro-muted group-hover:text-futuro-text">{(Math.random() * 50000).toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="py-2 my-1 text-center text-futuro-muted font-sans text-[10px] bg-futuro-bg/50 rounded border border-futuro-border/30 border-dashed">
                       Spread: R$ 0.01
                    </div>
                     {[0.05, 0.15, 0.25].map(p => (
                      <div key={p} className="flex justify-between items-center py-1 hover:bg-futuro-surface/50 rounded px-1 transition-colors cursor-pointer group">
                        <span className="text-futuro-danger font-bold">R$ {(activeMarket.yesPrice + p/10).toFixed(2)}</span>
                        <span className="text-futuro-muted group-hover:text-futuro-text">{(Math.random() * 50000).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
      </div>
      );
    }

    switch (activeTab) {
      case 'PORTFOLIO':
        return user ? <Portfolio user={user} markets={MOCK_MARKETS} /> : null;
      case 'RANKING':
        return <Leaderboard entries={MOCK_LEADERBOARD} />;
      case 'NEWS':
        return <NewsFeed news={MOCK_NEWS} markets={MOCK_MARKETS} onMarketClick={handleMarketClickFromNews} />;
      case 'MARKETS':
      default:
        return (
          <div className="animate-in fade-in duration-500">
            <div className="mb-12 relative">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-futuro-primary/5 to-transparent blur-3xl -z-10"></div>
               <h1 className="text-4xl md:text-5xl font-extrabold text-futuro-text mb-4 tracking-tight">
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
                        ? 'bg-futuro-text text-futuro-bg shadow-lg shadow-white/10' 
                        : 'bg-futuro-card border border-futuro-border text-futuro-muted hover:border-futuro-muted hover:text-futuro-text'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {isLoadingMarkets ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="h-full">
                     <MarketCardSkeleton />
                   </div>
                 ))}
              </div>
            ) : filteredMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMarkets.map(market => (
                  <div key={market.id} className="h-full">
                    <MarketCard market={market} onClick={handleMarketClick} />
                  </div>
                ))}
                
                <div className="group bg-gradient-to-br from-futuro-primary/10 to-futuro-card border border-futuro-primary/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-5 hover:border-futuro-primary/40 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-futuro-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-8 h-8 text-futuro-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-futuro-text mb-2">Sugira um Mercado</h3>
                    <p className="text-sm text-futuro-muted">Não encontrou o que procura? Crie sua própria aposta personalizada usando nossa IA.</p>
                  </div>
                  <button className="px-6 py-3 bg-futuro-primary hover:bg-yellow-300 text-futuro-bg rounded-xl text-sm font-bold transition-colors w-full flex items-center justify-center gap-2">
                    Criar Mercado <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-futuro-surface p-4 rounded-full mb-4">
                  <SearchX className="w-10 h-10 text-futuro-muted" />
                </div>
                <h3 className="text-xl font-bold text-futuro-text">Nenhum mercado encontrado</h3>
                <p className="text-futuro-muted mt-2">Tente buscar por outros termos ou troque a categoria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
                  className="mt-6 text-futuro-primary font-bold hover:underline"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-futuro-bg font-sans text-futuro-text pb-20 selection:bg-futuro-primary selection:text-futuro-bg transition-colors duration-300">
      <Navbar 
        onNavigateHome={handleNavigateHome} 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onOpenLogin={() => setIsLoginModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
        {renderContent()}
      </main>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginGoogle={async () => {
          await loginWithGoogle();
          setIsLoginModalOpen(false);
          addToast("Login realizado com sucesso!", "success");
        }}
        isLoading={isLoading}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}