'use client';
import { useConversation } from '@/context/use-conversation';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Separator from '../separator';
import Conversations from './conversations';
import SidebarFooter from './footer';
import SidebarHeader from './header';

const Aside: React.FC = () => {
  const { conversations } = useConversation();
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };
  const closeSidebar = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isMobile) return closeSidebar;
  }, [isMobile, pathname]);

  return (
    <aside
      className={cn(
        'w-sm shrink-0 h-screen flex flex-col border-r border-gray-100 transition bg-white',
        open ? 'max-md:absolute z-10 max-md:w-full' : '[&_.collapsable]:hidden w-fit items-center'
      )}
    >
      <SidebarHeader toggleSidebar={toggleSidebar} />
      <Separator className="collapsable" />

      <div className="py-2 px-4 space-y-2 grow">
        <h2 className="font-semibold text-sm collapsable">Conversations</h2>
        <Conversations conversations={conversations} />
      </div>

      <Separator className="collapsable" />
      {profile && <SidebarFooter profile={profile} />}
    </aside>
  );
};

export default Aside;
