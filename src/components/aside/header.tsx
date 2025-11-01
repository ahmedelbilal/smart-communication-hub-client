import Image from 'next/image';
import Link from 'next/link';
import Button from '../button';
import { useConversation } from '@/context/use-conversation';

export type SidebarHeader = {
  toggleSidebar: () => void;
};

const SidebarHeader: React.FC<SidebarHeader> = ({ toggleSidebar }) => {
  const { setActiveConversation } = useConversation();

  return (
    <div className="p-4 flex items-center justify-between">
      <Link href="/" className="collapsable" onClick={() => setActiveConversation(null)}>
        <Image src="/message-circle.svg" alt="Message Circle" width={24} height={24} />
      </Link>

      <Button className="p-2 rounded-xl hover:bg-gray-100 bg-white w-fit" onClick={toggleSidebar}>
        <Image src="/menu.svg" alt="Menu" width={24} height={24} />
      </Button>
    </div>
  );
};

export default SidebarHeader;
