'use client';

import { generateInsights } from '@/actions/generate-inshgts';
import { Conversation } from '@/types/conversation';
import Image from 'next/image';
import { startTransition, useActionState, useEffect } from 'react';
import Button from '../button';
import Separator from '../separator';
import toast from 'react-hot-toast';

export type InsightsProps = {
  onClose: () => void;
  conversation: Conversation;
};

const Insights: React.FC<InsightsProps> = ({ onClose, conversation }) => {
  const [state, formAction, pending] = useActionState(generateInsights, {
    success: null,
    message: '',
  });

  useEffect(() => {
    if (state.success === null) return;
    if (!state.success) toast.error(state.message);
  });

  const handleGenerateInsight = () => {
    const formData = new FormData();
    formData.set('conversationId', conversation.id!);
    startTransition(() => formAction(formData));
  };

  return (
    <aside className="flex flex-col w-full shrink-0 md:w-1/3 h-full border-l border-gray-100 transition-all duration-300 absolute md:static inset-0 z-10 bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Insights</h2>
        <Button className="p-2 rounded-xl hover:bg-gray-100 bg-white w-fit" onClick={onClose}>
          <Image src="/cross.svg" alt="Cross" width={24} height={24} />
        </Button>
      </div>
      <Separator />
      {(conversation.insight?.summary || state.data?.summary) && (
        <div className="p-4">
          <h3 className="font-semibold">Summary</h3>
          <p>{conversation.insight?.summary || state.data?.summary}</p>
        </div>
      )}

      {!conversation.insight && conversation.id && !state.data && (
        <Button
          onClick={handleGenerateInsight}
          className="w-fit mt-auto mb-auto mx-auto"
          disabled={pending}
          loading={pending}
        >
          Generate
        </Button>
      )}
    </aside>
  );
};

export default Insights;
