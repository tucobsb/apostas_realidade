import { Category, Market, NewsItem, LeaderboardEntry, User } from './types';

const generateHistory = (startPrice: number, volatility: number, steps: number): any[] => {
  const data = [];
  let currentPrice = startPrice;
  const now = new Date();
  
  for (let i = steps; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600 * 1000 * 4); // 4 hour steps
    // Random walk
    const change = (Math.random() - 0.5) * volatility;
    currentPrice += change;
    if (currentPrice > 0.99) currentPrice = 0.99;
    if (currentPrice < 0.01) currentPrice = 0.01;
    
    data.push({
      timestamp: time.toISOString(),
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  return data;
};

export const MOCK_MARKETS: Market[] = [
  // --- ECONOMIA ---
  {
    id: 'selic-copom',
    title: 'Copom cortará a Selic em 0.5%?',
    description: 'O Comitê de Política Monetária (Copom) anunciará um corte de 0,50 p.p. na taxa Selic na próxima reunião?',
    category: Category.ECONOMIA,
    imageUrl: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&q=80&w=800',
    volume: 4500000,
    yesPrice: 0.65,
    noPrice: 0.35,
    endDate: '2024-05-08',
    history: generateHistory(0.55, 0.05, 50),
    rules: 'Resolve como SIM se o Banco Central do Brasil anunciar oficialmente um corte de exatos 0,50 pontos percentuais na meta da taxa Selic.'
  },
  {
    id: 'dolar-5-reais',
    title: 'Dólar fecha ano acima de R$ 6,00?',
    description: 'A taxa de câmbio oficial PTAX de venda USD/BRL fechará acima de R$ 6,00 no último dia útil de 2024?',
    category: Category.ECONOMIA,
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800',
    volume: 12000000,
    yesPrice: 0.42,
    noPrice: 0.58,
    endDate: '2024-12-31',
    history: generateHistory(0.38, 0.04, 50),
    rules: 'Baseado na cotação PTAX de venda divulgada pelo Banco Central do Brasil no último dia útil do ano.'
  },
  
  // --- POLÍTICA ---
  {
    id: 'eleicao-sp-nunes',
    title: 'Nunes reeleito prefeito de SP?',
    description: 'Ricardo Nunes vencerá a eleição para a Prefeitura de São Paulo em 2024?',
    category: Category.POLITICA,
    imageUrl: 'https://images.unsplash.com/photo-1578894381163-e72c17f2b45f?auto=format&fit=crop&q=80&w=800',
    volume: 9800000,
    yesPrice: 0.55,
    noPrice: 0.45,
    endDate: '2024-10-27',
    history: generateHistory(0.52, 0.03, 50),
    rules: 'Resolve SIM se Ricardo Nunes for declarado matematicamente eleito pelo TSE, seja no primeiro ou segundo turno.'
  },
  {
    id: 'aprovacao-governo',
    title: 'Aprovação do Governo sobe em Junho?',
    description: 'A taxa de aprovação "Ótimo/Bom" do Governo Federal será superior a 38% na próxima pesquisa Datafolha?',
    category: Category.POLITICA,
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
    volume: 3200000,
    yesPrice: 0.30,
    noPrice: 0.70,
    endDate: '2024-06-30',
    history: generateHistory(0.35, 0.05, 50),
    rules: 'Considera-se o percentual de avaliação Ótimo/Bom na pesquisa estimulada nacional do Datafolha divulgada em Junho/2024.'
  },
  {
    id: 'pec-drogas',
    title: 'PEC das Drogas aprovada no Senado?',
    description: 'O Senado Federal aprovará a PEC que criminaliza o porte de qualquer quantidade de droga?',
    category: Category.POLITICA,
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    volume: 1500000,
    yesPrice: 0.85,
    noPrice: 0.15,
    endDate: '2024-05-30',
    history: generateHistory(0.80, 0.02, 50),
    rules: 'Resolve SIM se a Proposta de Emenda à Constituição for aprovada em dois turnos no Plenário do Senado.'
  },

  // --- EMPRESAS / BRASIL ---
  {
    id: 'petrobras-dividendos',
    title: 'Petrobras paga dividendos extras?',
    description: 'A Petrobras (PETR4) anunciará pagamento de dividendos extraordinários no próximo trimestre?',
    category: Category.BRASIL,
    imageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800',
    volume: 6700000,
    yesPrice: 0.33,
    noPrice: 0.67,
    endDate: '2024-04-25',
    history: generateHistory(0.40, 0.15, 50),
    rules: 'Resolve SIM se houver anúncio de proventos classificados como extraordinários ou complementares.'
  },
  {
    id: 'nubank-lucro',
    title: 'Nubank supera expectativa de lucro?',
    description: 'O Nu Holdings reportará lucro líquido acima de US$ 400M no próximo balanço trimestral?',
    category: Category.TECNOLOGIA,
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800',
    volume: 2100000,
    yesPrice: 0.81,
    noPrice: 0.19,
    endDate: '2024-05-15',
    history: generateHistory(0.70, 0.06, 50),
    rules: 'Baseado no relatório oficial de Relações com Investidores (earnings release).'
  },

  // --- CULTURA & ESPORTES ---
  {
    id: 'carnaval-chuva-rj',
    title: 'Chuva no desfile das campeãs RJ?',
    description: 'Haverá precipitação registrada no Sambódromo da Marquês de Sapucaí durante o desfile das campeãs?',
    category: Category.CULTURA,
    imageUrl: 'https://images.unsplash.com/photo-1564228511783-6c84c7595222?auto=format&fit=crop&q=80&w=800',
    volume: 320000,
    yesPrice: 0.50,
    noPrice: 0.50,
    endDate: '2024-02-17',
    history: generateHistory(0.50, 0.10, 50),
    rules: 'Dados oficiais do INMET para a estação meteorológica mais próxima no horário do evento.'
  },
  {
    id: 'flamengo-libertadores',
    title: 'Flamengo campeão da Libertadores?',
    description: 'O Clube de Regatas do Flamengo vencerá a final da Copa Libertadores da América de 2024?',
    category: Category.ESPORTES,
    imageUrl: 'https://images.unsplash.com/photo-1552318965-5638e4c76716?auto=format&fit=crop&q=80&w=800',
    volume: 850000,
    yesPrice: 0.28,
    noPrice: 0.72,
    endDate: '2024-11-30',
    history: generateHistory(0.30, 0.03, 50),
    rules: 'Resolve SIM se o Flamengo levantar a taça, independente se a vitória for no tempo normal ou pênaltis.'
  },
  
  // --- CRYPTO ---
  {
    id: 'btc-350k-brl',
    title: 'Bitcoin atinge R$ 400k em 2024?',
    description: 'O preço do Bitcoin ultrapassará a marca de R$ 400.000,00 no Mercado Bitcoin antes de Julho?',
    category: Category.TECNOLOGIA,
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800',
    volume: 4500000,
    yesPrice: 0.45,
    noPrice: 0.55,
    endDate: '2024-07-01',
    history: generateHistory(0.40, 0.08, 50),
    rules: 'Baseado na cotação máxima diária (high) na exchange Mercado Bitcoin.'
  }
];

// Dados Iniciais de um Novo Usuário
export const INITIAL_USER: User = {
  id: '',
  name: '',
  email: '',
  balance: 15420.50, // Saldo inicial de demo
  portfolioValue: 3450.00,
  positions: [
    {
      marketId: 'selic-copom',
      side: 'SIM',
      quantity: 1000,
      avgPrice: 0.55,
      currentPrice: 0.65,
      pnl: 100.00
    },
    {
      marketId: 'eleicao-sp-nunes',
      side: 'NÃO',
      quantity: 500,
      avgPrice: 0.40,
      currentPrice: 0.45,
      pnl: 25.00
    },
    {
      marketId: 'flamengo-libertadores',
      side: 'SIM',
      quantity: 200,
      avgPrice: 0.20,
      currentPrice: 0.28,
      pnl: 16.00
    }
  ]
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Datafolha mostra empate técnico entre Nunes e Boulos',
    source: 'Folha de S.Paulo',
    timeAgo: '1h atrás',
    sentiment: 'Neutro',
    relatedMarketId: 'eleicao-sp-nunes'
  },
  {
    id: '2',
    title: 'Inflação acima do esperado pressiona Copom por cautela',
    source: 'Valor Econômico',
    timeAgo: '2h atrás',
    sentiment: 'Negativo',
    relatedMarketId: 'selic-copom'
  },
  {
    id: '3',
    title: 'Petróleo sobe com tensão no oriente médio; Petrobras avança',
    source: 'Infomoney',
    timeAgo: '5h atrás',
    sentiment: 'Neutro',
    relatedMarketId: 'petrobras-dividendos'
  },
  {
    id: '4',
    title: 'Senado acelera tramitação da PEC das Drogas',
    source: 'Agência Senado',
    timeAgo: '6h atrás',
    sentiment: 'Positivo',
    relatedMarketId: 'pec-drogas'
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'AlphaTrader_BR', profit: 154000.00, roi: 342.5 },
  { rank: 2, username: 'FariaLimaBets_King', profit: 89500.20, roi: 125.4 },
  { rank: 3, username: 'CryptoNinja', profit: 45200.50, roi: 98.2 },
  { rank: 4, username: 'EconomistaSincero', profit: 32100.00, roi: 45.0 },
  { rank: 5, username: 'VidenteDasCotas', profit: 28400.10, roi: 32.1 },
  { rank: 6, username: 'HolderRaiz', profit: 15200.00, roi: 28.4 },
  { rank: 7, username: 'DayTrade_Fail', profit: 1200.00, roi: 5.2 },
  { rank: 8, username: 'EstagiarioDaBolsa', profit: -450.00, roi: -2.5 },
];