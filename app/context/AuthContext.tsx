'use client';

import { createContext, useContext, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';

type User = {
  id: string;
  email: string;
  username: string | null;
  role: number | null;
  name?: string;
  image?: string;
};

type AuthContextProps = {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  handleSignOut: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>({
  user: null,
  status: 'loading',
  handleSignOut: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();

  const callbackUrl = useMemo(
    () =>
      typeof window !== 'undefined'
        ? `${window.location.origin}/sign-in`
        : '/sign-in',
    []
  );

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl });
  };

  const user = session?.user ?? null;

  const contextValue = useMemo(
    () => ({
      user,
      status,
      handleSignOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, status, callbackUrl]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
