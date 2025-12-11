import React from 'react';
import { NewsItem, Market } from '../types';
import { Newspaper, Clock, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
  markets: Market[];
  onMarketClick: (market: Market) => void;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news, markets, onMarketClick }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-futuro-surface p-3 rounded-xl">
           <Newspaper className="w-6 h-6 text-futuro-text" />
         </div>
         <div>
            <h1 className="text-3xl font-bold text-futuro-text">Radar de Notícias</h1>
            <p className="text-futuro-muted">Fatos que movem os preços em tempo real.</p>
         </div>
      </div>

      <div className="grid gap-4">
        {news.map((item) => {
          const relatedMarket = markets.find(m => m.id === item.relatedMarketId);

          let sentimentColor = 'text-futuro-muted';
          let SentimentIcon = Minus;
          
          if (item.sentiment === 'Positivo') {
             sentimentColor = 'text-futuro-success';
             SentimentIcon = TrendingUp;
          } else if (item.sentiment === 'Negativo') {
             sentimentColor = 'text-futuro-danger';
             SentimentIcon = TrendingDown;
          }

          return (
            <div key={item.id} className="bg-futuro-card border border-futuro-border rounded-xl p-5 hover:border-futuro-primary/30 transition-all group">
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-start">
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-xs font-bold text-futuro-primary bg-futuro-primary/10 px-2 py-0.5 rounded border border-futuro-primary/20 uppercase">
                         {item.source}
                       </span>
                       <span className="text-xs text-futuro-muted flex items-center gap-1">
                         <Clock className="w-3 h-3" /> {item.timeAgo}
                       </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-futuro-text mb-3 leading-snug group-hover:text-futuro-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className={`flex items-center gap-1 text-xs font-bold ${sentimentColor} mb-4 md:mb-0`}>
                       <SentimentIcon className="w-3 h-3" />
                       Sentimento {item.sentiment}
                    </div>
                 </div>

                 {relatedMarket && (
                   <div 
                     onClick={() => onMarketClick(relatedMarket)}
                     className="bg-futuro-bg border border-futuro-border rounded-lg p-3 min-w-[200px] cursor-pointer hover:border-futuro-muted transition-colors"
                   >
                      <div className="flex items-center gap-2 mb-2">
                         <img src={relatedMarket.imageUrl} className="w-6 h-6 rounded-full object-cover" />
                         <span className="text-xs font-bold text-futuro-text truncate max-w-[140px]">{relatedMarket.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-futuro-muted">Impacto no SIM:</span>
                         <span className="font-mono text-futuro-text">{(relatedMarket.yesPrice * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-futuro-surface h-1.5 rounded-full mt-1.5 overflow-hidden">
                         <div className="bg-futuro-success h-full" style={{ width: `${relatedMarket.yesPrice * 100}%`}}></div>
                      </div>
                      <div className="text-[10px] text-futuro-primary mt-2 flex items-center justify-end gap-1">
                         Ver Mercado <ExternalLink className="w-3 h-3" />
                      </div>
                   </div>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};