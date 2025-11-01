'use client';

import { SOCKET_URL } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import React, { createContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: React.RefObject<Socket | null>;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: { token },
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return <SocketContext.Provider value={{ socket: socketRef }}>{children}</SocketContext.Provider>;
};
