'use client';
import { useSocketContext } from '@/context/socket-provider';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import Insights from '../insights';
import Separator from '../separator';
import ChatBody from './body';
import ChatFooter from './footer';
import ChatHeader from './header';

export type ChatProps = {
  receiver: User;
  initMessages?: Message[];
};

const Chat: React.FC<ChatProps> = ({ initMessages, receiver }) => {
  const { setMessages, messages } = useSocketContext();
  const [showInsights, setShowInsights] = useState(false);
  const toggleInsights = () => {
    setShowInsights(!showInsights);
  };
  useEffect(() => {
    if (initMessages) setMessages(initMessages);
  }, [initMessages]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center grow relative">
        <ChatHeader
          onToggleInsights={toggleInsights}
          user={receiver}
          insightsVisible={showInsights}
        />
        <Separator />
        <ChatBody messages={messages} />
        <ChatFooter className="sticky" receiver={receiver} />
      </div>
      {showInsights && <Insights onClose={toggleInsights} />}
    </>
  );
};

export default Chat;
