'use client';
import { SOCKET_URL } from '@/constants';
import { useAuth } from '@/hooks/use-auth';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: { token },
    });

    socketRef.current = socketInstance;
    queueMicrotask(() => setSocket(socketInstance));

    return () => {
      socketInstance.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [token]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
