import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { setCookie, getCookie, removeCookie } from '@/lib/cookies';
import { useRouter} from "next/router";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('auth_token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      removeCookie('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setCookie('auth_token', data.token, { expires: 7, sameSite: 'strict' });
        setUser(data.user);
        queryClient.invalidateQueries();
        router.push('/');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name?: string }) => {
      const response = await apiClient.post('/auth/register', { email, password, name });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setCookie('auth_token', data.token, { expires: 7, sameSite: 'strict' });
        setUser(data.user);
        queryClient.invalidateQueries();
        router.push('/');

      }
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.post('/auth/google', { token });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setCookie('auth_token', data.token, { expires: 7, sameSite: 'strict' });
        setUser(data.user);
        queryClient.invalidateQueries();
        router.push('/');

      }
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (email: string, password: string, name?: string) => {
    await registerMutation.mutateAsync({ email, password, name });
  };

  const googleLogin = async (token: string) => {
    await googleLoginMutation.mutateAsync(token);
  };

  const logout = () => {
    removeCookie('auth_token');
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
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
