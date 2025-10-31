'use client';

import { useAuth } from '@/hooks/use-auth';
import { Message } from '@/types/message';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Avatar from '../avatar';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);

interface ChatBodyProps {
  messages?: Message[];
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages }) => {
  const { profile } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isAtBottom) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useLayoutEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'instant' }), 100);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-3 p-4 grow overflow-y-auto">
      {messages?.map((message) => {
        const isMine = message.sender.id === profile?.id;
        return (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!isMine && <Avatar text={message.sender.name} />}

            <div
              className={cn(
                'max-w-[70%] flex flex-col',
                isMine ? 'items-end text-right' : 'items-start text-left'
              )}
            >
              <div
                className={cn(
                  'p-3 rounded-2xl shadow-sm',
                  isMine
                    ? 'bg-amber-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                )}
              >
                <p>{message.content}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {dayjs(message.createdAt).fromNow()}
              </span>
            </div>

            {isMine && <Avatar className="bg-amber-500 text-white" text={profile.name} />}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;
