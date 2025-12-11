import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUserBalance: (newBalance: number, newPortfolioValue: number) => void;
  addPosition: (position: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simular verificação de sessão ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('futuro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Persistir usuário sempre que mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('futuro_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('futuro_user');
    }
  }, [user]);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulação de delay de rede e autenticação
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Usuário mockado vindo do "Google"
    const mockGoogleUser: User = {
      ...INITIAL_USER, // Começa com os dados iniciais/mockados
      id: 'google-uid-123',
      name: 'Visitante Futuro',
      email: 'visitante@gmail.com',
      avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocIq8d...=s96-c', // Exemplo genérico ou usar placeholder
    };
    
    setUser(mockGoogleUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    window.location.reload(); // Limpa estado geral
  };

  const updateUserBalance = (newBalance: number, newPortfolioValue: number) => {
    if (user) {
      setUser({ ...user, balance: newBalance, portfolioValue: newPortfolioValue });
    }
  };

  const addPosition = (newPosition: any) => {
    if (!user) return;
    
    // Lógica simples para agrupar posições ou adicionar nova
    const existingPosIndex = user.positions.findIndex(
      p => p.marketId === newPosition.marketId && p.side === newPosition.side
    );

    let updatedPositions = [...user.positions];

    if (existingPosIndex >= 0) {
      const existing = updatedPositions[existingPosIndex];
      const totalCost = (existing.quantity * existing.avgPrice) + (newPosition.quantity * newPosition.avgPrice);
      const totalQty = existing.quantity + newPosition.quantity;
      
      updatedPositions[existingPosIndex] = {
        ...existing,
        quantity: totalQty,
        avgPrice: totalCost / totalQty,
        currentPrice: newPosition.currentPrice, // Atualiza preço atual
        pnl: (newPosition.currentPrice * totalQty) - totalCost
      };
    } else {
      updatedPositions.push(newPosition);
    }

    setUser({ ...user, positions: updatedPositions });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, logout, updateUserBalance, addPosition }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};