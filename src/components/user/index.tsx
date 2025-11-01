import { cn } from '@/lib/utils';
import { User as UserType } from '@/types/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Avatar from '../avatar';

export type UserProps = { user: UserType; active?: boolean } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const User: React.FC<UserProps> = ({ user, active, className, ...props }) => {
  return (
    <div
      className={cn(
        'w-full hover:bg-gray-100 p-2 rounded-xl flex items-center gap-2',
        active && 'bg-gray-100',
        className
      )}
      {...props}
    >
      <div className="relative">
        <Avatar className="bg-amber-300 md:w-10 md:h-10" text={user.name} />
        <div
          className={cn(
            'w-3 h-3 absolute bottom-0 right-0 z-10 rounded-full',
            user.online && 'bg-green-500'
          )}
        />
      </div>
      <span className="first-letter:uppercase collapsable">{user.name}</span>
    </div>
  );
};

export default User;
