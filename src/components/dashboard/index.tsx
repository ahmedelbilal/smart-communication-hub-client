'use client';

import { User } from '@/types/user';
import { useEffect } from 'react';
import Chat from '../chat';
import UsersSearchForm from '../users-search-form';
import { useConversation } from '@/context/use-conversation';

export type DashboardProps = {
  initUsers: User[];
};

const Dashboard: React.FC<DashboardProps> = ({ initUsers }) => {
  const { setActiveConversation, activeConversation } = useConversation();
  useEffect(() => () => setActiveConversation(null), []);

  if (activeConversation) return <Chat conversation={activeConversation} />;

  return (
    <main className="h-screen w-full flex items-center justify-center p-5">
      <div className="space-y-4 max-w-sm w-full">
        <h1 className="text-xl font-semibold">Find Someone</h1>
        <UsersSearchForm
          initUsers={initUsers}
          onUserClick={(user) => setActiveConversation({ user, messages: [] })}
        />
      </div>
    </main>
  );
};

export default Dashboard;
