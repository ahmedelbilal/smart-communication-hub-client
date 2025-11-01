import { User as UserType } from '@/types/user';
import User from '../user';

export type SidebarFooterProps = { profile: UserType };

const SidebarFooter: React.FC<SidebarFooterProps> = ({ profile }) => {
  return (
    <div className="p-4">
      <User user={profile} />
    </div>
  );
};

export default SidebarFooter;
