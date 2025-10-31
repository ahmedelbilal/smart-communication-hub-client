import { User as UserType } from '@/types/user';
import User from '../user';

export type UsersProps = {
  users: UserType[];
  onClick: (user: UserType) => void;
};

const Users: React.FC<UsersProps> = ({ users, onClick }) => {
  return (
    <div className="grow space-y-2">
      {users.map((user) => (
        <User key={user.id} user={user} onClick={() => onClick(user)} />
      ))}
    </div>
  );
};

export default Users;
