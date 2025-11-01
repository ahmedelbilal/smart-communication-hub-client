'use client';

import { startTransition, useActionState, useEffect, useMemo, useState } from 'react';
import Input from '../input';
import Users from '../users-list';
import useDebounce from '@/hooks/use-debounce';
import { searchUsers } from '@/actions/search-users';
import { User } from '@/types/user';
import Loader from '../loader';

export type UsersSearchFormProps = { initUsers: User[]; onUserClick: (user: User) => void };

const UsersSearchForm: React.FC<UsersSearchFormProps> = ({ initUsers, onUserClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  const [state, action, pending] = useActionState(searchUsers, {
    message: '',
    success: null,
  });

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    const formDate = new FormData();
    formDate.set('q', debouncedSearchTerm);
    startTransition(() => action(formDate));
  }, [action, debouncedSearchTerm]);

  const users = useMemo(
    () => (!state.success || !debouncedSearchTerm ? initUsers : state.data),
    [debouncedSearchTerm, initUsers, state.data, state.success]
  );

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        type="search"
        placeholder="Email or Name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {pending && <Loader className="mx-auto" />}

      {!users?.length && !pending && <p className="text-center">No Results</p>}

      {!!users?.length && !pending && <Users users={users} onClick={onUserClick} />}
    </div>
  );
};

export default UsersSearchForm;
