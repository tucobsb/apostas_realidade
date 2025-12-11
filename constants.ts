import { Category, Market } from './types';

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
  {
    id: 'selic-copom',
    title: 'Copom cortará a Selic em 0.5%?',
    description: 'O Comitê de Política Monetária (Copom) anunciará um corte de 0,50 p.p. na taxa Selic na próxima reunião?',
    category: Category.ECONOMIA,
    imageUrl: 'https://images.unsplash.com/photo-1628151016024-5d55b3303d2e?auto=format&fit=crop&q=80&w=400',
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
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400',
    volume: 12000000,
    yesPrice: 0.42,
    noPrice: 0.58,
    endDate: '2024-12-31',
    history: generateHistory(0.38, 0.04, 50),
    rules: 'Baseado na cotação PTAX de venda divulgada pelo Banco Central do Brasil no último dia útil do ano.'
  },
  {
    id: 'flamengo-libertadores',
    title: 'Flamengo campeão da Libertadores?',
    description: 'O Clube de Regatas do Flamengo vencerá a final da Copa Libertadores da América de 2024?',
    category: Category.ESPORTES,
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=400',
    volume: 850000,
    yesPrice: 0.28,
    noPrice: 0.72,
    endDate: '2024-11-30',
    history: generateHistory(0.30, 0.03, 50),
    rules: 'Resolve SIM se o Flamengo levantar a taça, independente se a vitória for no tempo normal ou pênaltis.'
  },
  {
    id: 'nubank-lucro',
    title: 'Nubank supera expectativa de lucro?',
    description: 'O Nu Holdings reportará lucro líquido acima de US$ 400M no próximo balanço trimestral?',
    category: Category.TECNOLOGIA,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
    volume: 2100000,
    yesPrice: 0.81,
    noPrice: 0.19,
    endDate: '2024-05-15',
    history: generateHistory(0.70, 0.06, 50),
    rules: 'Baseado no relatório oficial de Relações com Investidores (earnings release).'
  },
  {
    id: 'carnaval-chuva-rj',
    title: 'Chuva no desfile das campeãs RJ?',
    description: 'Haverá precipitação registrada no Sambódromo da Marquês de Sapucaí durante o desfile das campeãs?',
    category: Category.CULTURA,
    imageUrl: 'https://images.unsplash.com/photo-1565596434446-b6058c49e126?auto=format&fit=crop&q=80&w=400',
    volume: 320000,
    yesPrice: 0.50,
    noPrice: 0.50,
    endDate: '2024-02-17',
    history: generateHistory(0.50, 0.10, 50),
    rules: 'Dados oficiais do INMET para a estação meteorológica mais próxima no horário do evento.'
  },
  {
    id: 'petrobras-dividendos',
    title: 'Petrobras paga dividendos extras?',
    description: 'A Petrobras (PETR4) anunciará pagamento de dividendos extraordinários no próximo trimestre?',
    category: Category.BRASIL,
    imageUrl: 'https://images.unsplash.com/photo-1596614923282-53b49e49a1d4?auto=format&fit=crop&q=80&w=400',
    volume: 6700000,
    yesPrice: 0.33,
    noPrice: 0.67,
    endDate: '2024-04-25',
    history: generateHistory(0.40, 0.15, 50),
    rules: 'Resolve SIM se houver anúncio de proventos classificados como extraordinários ou complementares.'
  }
];

export const INITIAL_USER = {
  balance: 50000.00, // em Reais
  portfolioValue: 1250.50,
  positions: []
};