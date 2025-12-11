import React from 'react';
import { Search, UserCircle, Menu } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigateHome }) => {
  return (
    <nav className="h-16 border-b border-futuro-border bg-futuro-bg/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-8">
        <div 
          onClick={onNavigateHome}
          className="text-2xl font-extrabold tracking-tighter cursor-pointer text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          {/* Logo Icon Style */}
          <div className="w-8 h-8 bg-gradient-to-tr from-futuro-primary to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-futuro-bg font-bold text-lg">F</span>
          </div>
          Futuro
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-futuro-muted">
          <span className="text-white cursor-pointer border-b-2 border-futuro-primary pb-0.5">Mercados</span>
          <span className="hover:text-white cursor-pointer transition-colors">Carteira</span>
          <span className="hover:text-white cursor-pointer transition-colors">Ranking</span>
          <span className="hover:text-white cursor-pointer transition-colors">Notícias</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-futuro-surface border border-futuro-border rounded-full px-4 py-1.5 w-64 focus-within:border-futuro-primary focus-within:ring-1 focus-within:ring-futuro-primary transition-all">
          <Search className="w-4 h-4 text-futuro-muted mr-2" />
          <input 
            type="text" 
            placeholder="Buscar eventos..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-futuro-muted"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-futuro-border pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase tracking-wider text-futuro-muted font-bold">Saldo Disponível</div>
            <div className="text-sm font-bold text-futuro-success">R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="w-9 h-9 bg-futuro-surface rounded-full flex items-center justify-center border border-futuro-border cursor-pointer hover:bg-futuro-card transition-colors">
             <UserCircle className="w-6 h-6 text-futuro-muted" />
          </div>
        </div>
      </div>
    </nav>
  );
};