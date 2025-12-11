import React from 'react';
import { Search, UserCircle, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export type Tab = 'MARKETS' | 'PORTFOLIO' | 'RANKING' | 'NEWS';

interface NavbarProps {
  onNavigateHome: () => void;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onOpenLogin: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigateHome, 
  activeTab, 
  onTabChange, 
  onOpenLogin,
  searchTerm,
  onSearchChange
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const getTabClass = (tab: Tab) => {
    return activeTab === tab 
      ? "text-futuro-text cursor-pointer border-b-2 border-futuro-primary pb-0.5 transition-all"
      : "text-futuro-muted hover:text-futuro-text cursor-pointer transition-colors";
  }

  return (
    <nav className="h-16 border-b border-futuro-border bg-futuro-bg/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
      <div className="flex items-center gap-8">
        <div 
          onClick={onNavigateHome}
          className="text-2xl font-extrabold tracking-tighter cursor-pointer text-futuro-text flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          {/* Logo Icon Style */}
          <div className="w-8 h-8 bg-gradient-to-tr from-futuro-primary to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-futuro-bg font-bold text-lg">F</span>
          </div>
          Futuro
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-futuro-muted">
          <span onClick={() => onTabChange('MARKETS')} className={getTabClass('MARKETS')}>Mercados</span>
          {user && <span onClick={() => onTabChange('PORTFOLIO')} className={getTabClass('PORTFOLIO')}>Carteira</span>}
          <span onClick={() => onTabChange('RANKING')} className={getTabClass('RANKING')}>Ranking</span>
          <span onClick={() => onTabChange('NEWS')} className={getTabClass('NEWS')}>Notícias</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-futuro-muted hover:text-futuro-text hover:bg-futuro-surface transition-all"
          title={theme === 'dark' ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="hidden md:flex items-center bg-futuro-surface border border-futuro-border rounded-full px-4 py-1.5 w-48 lg:w-64 focus-within:border-futuro-primary focus-within:ring-1 focus-within:ring-futuro-primary transition-all">
          <Search className="w-4 h-4 text-futuro-muted mr-2" />
          <input 
            type="text" 
            placeholder="Buscar eventos..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-futuro-text w-full placeholder-futuro-muted"
          />
        </div>

        {user ? (
          <div className="flex items-center gap-4 border-l border-futuro-border pl-4 ml-2">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-futuro-muted font-bold">Saldo</div>
              <div className="text-sm font-bold text-futuro-success">R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            
            <div className="relative group cursor-pointer">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-9 h-9 rounded-full border border-futuro-border hover:border-futuro-primary transition-colors"
                  onClick={() => onTabChange('PORTFOLIO')}
                />
              ) : (
                <div 
                  onClick={() => onTabChange('PORTFOLIO')}
                  className="w-9 h-9 bg-futuro-surface rounded-full flex items-center justify-center border border-futuro-border hover:bg-futuro-card transition-colors"
                >
                   <span className="font-bold text-futuro-text text-xs">{user.name.substring(0, 2).toUpperCase()}</span>
                </div>
              )}
              
              {/* Dropdown Logout */}
              <div className="absolute right-0 top-full mt-2 w-32 bg-futuro-card border border-futuro-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-futuro-danger hover:bg-futuro-surface rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-3 h-3" /> Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={onOpenLogin}
            className="flex items-center gap-2 bg-futuro-text text-futuro-bg px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity ml-2"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
        )}
      </div>
    </nav>
  );
};