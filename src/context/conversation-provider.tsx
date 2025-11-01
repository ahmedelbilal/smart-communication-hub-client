'use client';

import Avatar from '@/components/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useSocket } from '@/hooks/use-socket';
import { Conversation } from '@/types/conversation';
import { Message, SendMessageDto } from '@/types/message';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ConversationContextType {
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (message: SendMessageDto) => void;
}

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { socket } = useSocket();
  const router = useRouter();
  const { profile } = useAuth();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const appendMessage = (message: Message) => {
    setActiveConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, message] } : null
    );
  };

  const sendMessage = (message: SendMessageDto) => {
    if (!socket) return;
    socket.current?.emit('send_message', message);
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      if (activeConversation?.id === message.conversation?.id) {
        appendMessage(message);
      } else {
        toast.custom(() => (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4 flex items-start">
              <Avatar text={message.sender.name} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New message received</p>
                <p className="mt-1 text-sm text-gray-500">{message.content}</p>
              </div>
            </div>
          </div>
        ));
      }
    };

    const handleMessageSent = (message: Message) => {
      if (activeConversation?.id === message.conversation?.id) appendMessage(message);
      else router.push(`/c/${message.conversation?.id}`);
    };

    socket.current?.on('new_message', handleNewMessage);
    socket.current?.on('message_sent', handleMessageSent);

    return () => {
      socket.current?.off('new_message', handleNewMessage);
      socket.current?.off('message_sent', handleMessageSent);
    };
  }, [socket, activeConversation?.id, profile?.id, router]);

  return (
    <ConversationContext.Provider
      value={{ activeConversation, setActiveConversation, sendMessage }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
