import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'arhamakidukhan',
  password: '21-arid-887'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.isAuthenticated && authData.username === ADMIN_CREDENTIALS.username) {
          setIsAuthenticated(true);
          setUser({ username: authData.username });
        }
      } catch (error) {
        // Invalid saved auth, clear it
        localStorage.removeItem('admin-auth');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple credential check
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUser({ username });
      
      // Save auth state to localStorage
      localStorage.setItem('admin-auth', JSON.stringify({
        isAuthenticated: true,
        username,
        loginTime: new Date().toISOString()
      }));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin-auth');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    user
  };

  return (
    <AuthContext.Provider value={value}>
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
