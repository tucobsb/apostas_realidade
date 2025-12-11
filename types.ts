export enum Category {
  ECONOMIA = 'Economia',
  POLITICA = 'Política',
  TECNOLOGIA = 'Tecnologia',
  CULTURA = 'Cultura & Entretenimento',
  ESPORTES = 'Esportes',
  BRASIL = 'Brasil'
}

export interface PricePoint {
  timestamp: string; // ISO date or localized time string
  price: number; // 0.01 to 0.99
}

export interface Market {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  volume: number;
  yesPrice: number;
  noPrice: number;
  endDate: string;
  history: PricePoint[]; // For the chart
  rules: string;
}

export interface Position {
  marketId: string;
  side: 'SIM' | 'NÃO';
  quantity: number;
  avgPrice: number;
  currentPrice: number; // Added for portfolio calculation
  pnl: number;         // Added for portfolio calculation
}

export interface User {
  id: string;        // Added for auth
  name: string;      // Added for auth
  email: string;     // Added for auth
  avatarUrl?: string; // Added for auth
  balance: number;
  portfolioValue: number;
  positions: Position[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  sentiment: 'Positivo' | 'Negativo' | 'Neutro';
  relatedMarketId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  profit: number;
  roi: number;
}