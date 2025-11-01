'use client';

import { User } from '@/types/user';
import { createContext, ReactNode, useMemo, useState } from 'react';

interface AuthContextValue {
  profile: User | null;
  token: string | null;
  setProfile: (profile: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  profile?: User;
  token?: string;
  children: ReactNode;
}

export const AuthProvider = ({
  profile: initialProfile,
  token: initialToken,
  children,
}: AuthProviderProps) => {
  const [profile, setProfile] = useState<User | null>(initialProfile ?? null);
  const [token, setToken] = useState<string | null>(initialToken ?? null);

  const logout = () => {
    setProfile(null);
    setToken(null);
  };

  const value = useMemo(() => ({ profile, token, setProfile, setToken, logout }), [profile, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
