'use client';

import Avatar from '@/components/avatar';
import { useSocket } from '@/hooks/use-socket';
import { Conversation } from '@/types/conversation';
import { Message, SendMessageDto } from '@/types/message';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ConversationContextType {
  activeConversation: Conversation | null;
  conversations: Conversation[];
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (message: SendMessageDto) => void;
}

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export type ConversationProviderProps = {
  conversations: Conversation[];
};

export const ConversationProvider: React.FC<PropsWithChildren<ConversationProviderProps>> = ({
  children,
  conversations: initConversations,
}) => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState(initConversations);
  const { socket } = useSocket();
  const router = useRouter();

  const appendMessage = (message: Message) => {
    setActiveConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, message] } : null
    );
  };

  const insertConversation = (conversation: Conversation) => {
    setConversations((prevConversations) => {
      const filteredConversations = prevConversations.filter((c) => c.id !== conversation.id);
      return [conversation, ...filteredConversations];
    });
  };

  const sendMessage = (message: SendMessageDto) => {
    if (!socket) return;
    socket.emit('send_message', message);
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      insertConversation({ ...message.conversation!, user: message.sender });

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
      if (activeConversation)
        insertConversation({ ...message.conversation!, user: activeConversation.user });

      if (activeConversation?.id === message.conversation?.id) appendMessage(message);
      else router.push(`/c/${message.conversation?.id}`);
    };

    const setUserStatusOnConversations = (user: Pick<User, 'id'>, status: boolean) => {
      setConversations((prevConversations) => {
        const indexOfLeft = prevConversations.findIndex(({ user: { id } }) => id === user.id);
        if (indexOfLeft === -1) return prevConversations;

        const newConversations = [...prevConversations];
        newConversations[indexOfLeft] = {
          ...newConversations[indexOfLeft],
          user: {
            ...newConversations[indexOfLeft].user,
            online: status,
          },
        };

        return newConversations;
      });
    };

    const setUserStatusOnActiveConversation = (status: boolean) => {
      setActiveConversation((prev) => ({
        ...prev!,
        user: { ...prev!.user, online: status },
      }));
    };

    const handleUserLeft = (user: Pick<User, 'id'>) => {
      if (activeConversation?.user.id === user.id) setUserStatusOnActiveConversation(false);
      setUserStatusOnConversations(user, false);
    };

    const handleUserJoined = (user: Pick<User, 'id'>) => {
      if (activeConversation?.user.id === user.id) setUserStatusOnActiveConversation(true);
      setUserStatusOnConversations(user, true);
    };

    socket.on('new_message', handleNewMessage);
    socket.on('message_sent', handleMessageSent);
    socket.on('user_left', handleUserLeft);
    socket.on('user_joined', handleUserJoined);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('message_sent', handleMessageSent);
      socket.off('user_left', handleUserLeft);
      socket.off('user_joined', handleUserJoined);
    };
  }, [socket, router, activeConversation]);

  return (
    <ConversationContext.Provider
      value={{ activeConversation, conversations, setActiveConversation, sendMessage }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
