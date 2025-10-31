import { Menu, MessageCircleCode } from 'lucide-react';
import Link from 'next/link';

export type SidebarHeader = {
  toggleSidebar: () => void;
};

const SidebarHeader: React.FC<SidebarHeader> = ({ toggleSidebar }) => {
  return (
    <div className="p-4 flex items-center justify-between">
      <Link href="/" className="collapsable">
        <MessageCircleCode />
      </Link>

      <button
        className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
    </div>
  );
};

export default SidebarHeader;
