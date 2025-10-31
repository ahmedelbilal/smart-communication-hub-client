'use client';

import { useSocketContext } from '@/context/socket-provider';
import React, { useState } from 'react';
import Input from '../input';
import Button from '../button';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';

export type ChatFooterProps = {
  receiver: User;
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

const ChatFooter: React.FC<ChatFooterProps> = ({ receiver, className, ...props }) => {
  const { sendMessage } = useSocketContext();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage({ content: text, receiverId: receiver.id, createdAt: new Date().toISOString() });
    setText('');
  };

  return (
    <form className={cn('w-full p-4 flex', className)} onSubmit={handleSubmit} {...props}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="message.."
        className="p-4 bg-gray-50 rounded-2xl w-full rounded-r-none"
      />
      <Button type="submit" className="px-4 rounded-l-none w-fit">
        Send
      </Button>
    </form>
  );
};

export default ChatFooter;
