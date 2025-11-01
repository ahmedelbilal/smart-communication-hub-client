'use client';
import { useEffect, useState } from 'react';
import Insights from '../insights';
import Separator from '../separator';
import ChatBody from './body';
import ChatFooter from './footer';
import ChatHeader from './header';
import { Conversation } from '@/types/conversation';
import { useConversation } from '@/context/use-conversation';

export type ChatProps = {
  conversation: Conversation;
};

const Chat: React.FC<ChatProps> = ({ conversation }) => {
  const { activeConversation, setActiveConversation } = useConversation();
  const [showInsights, setShowInsights] = useState(false);
  const toggleInsights = () => {
    setShowInsights(!showInsights);
  };
  useEffect(() => {
    setActiveConversation(conversation);
    return () => setActiveConversation(null);
  }, [conversation]);

  return (
    <>
      {activeConversation && (
        <div className="w-full h-full flex flex-col justify-center grow relative">
          <ChatHeader
            onToggleInsights={toggleInsights}
            user={activeConversation.user}
            insightsVisible={showInsights}
          />
          <Separator />
          <ChatBody messages={activeConversation.messages} />
          <ChatFooter className="sticky" receiver={activeConversation.user} />
        </div>
      )}
      {showInsights && <Insights conversation={conversation} onClose={toggleInsights} />}
    </>
  );
};

export default Chat;
