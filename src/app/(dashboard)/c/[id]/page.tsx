import Chat from '@/components/chat';
import { EXTERNAL_API_BASE } from '@/constants';
import { Conversation as ConversationType } from '@/types/conversation';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

export type ConversationProps = {
  params: Promise<{ id: string }>;
};

const Conversation: React.FC<ConversationProps> = async ({ params }) => {
  const id = (await params).id;

  const cookiesObj = await cookies();
  const token = cookiesObj.get('access_token')?.value;
  if (!token) redirect('/login');

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const conversationRes = await fetch(`${EXTERNAL_API_BASE}/conversations/${id}`, { headers });
  if (conversationRes.status === 401) redirect('/login');
  if (!conversationRes.ok) notFound();
  const conversation = (await conversationRes.json()) as ConversationType;

  return <Chat conversation={conversation} />;
};

export default Conversation;
