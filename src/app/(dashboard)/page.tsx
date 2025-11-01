import Dashboard from '@/components/dashboard';
import { EXTERNAL_API_BASE } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookiesObj = await cookies();
  const token = cookiesObj.get('access_token')?.value;
  if (!token) redirect('/login');

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const usersRes = await fetch(`${EXTERNAL_API_BASE}/users`, {
    headers,
    next: { tags: ['users'] },
  });

  const users = await usersRes.json();

  return <Dashboard initUsers={users} />;
}
