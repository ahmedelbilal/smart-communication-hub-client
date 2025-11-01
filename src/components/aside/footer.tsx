import { User as UserType } from '@/types/user';
import User from '../user';
import Button from '../button';
import Image from 'next/image';
import { logout } from '@/actions/logout';
import toast from 'react-hot-toast';

export type SidebarFooterProps = { profile: UserType };

const handleLogout = () => toast.promise(logout, { loading: "'Logout..'" });

const SidebarFooter: React.FC<SidebarFooterProps> = ({ profile }) => {
  return (
    <div className="p-4 flex items-center justify-between">
      <User className="w-fit hover:bg-transparent collapsable" user={profile} />
      <Button
        onClick={handleLogout}
        className="p-2 rounded-xl hover:bg-gray-100 bg-white w-fit"
        title="Logout"
      >
        <Image src="/logout.svg" alt="Logout" width={24} height={24} className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SidebarFooter;
