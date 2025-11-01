import { EXTERNAL_API_BASE } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Aside from '../../components/aside';
import { SocketProvider } from '@/context/socket-provider';
import { AuthProvider } from '@/context/auth-provider';
import { Toaster } from 'react-hot-toast';
import { ConversationProvider } from '@/context/conversation-provider';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesObj = await cookies();
  const token = cookiesObj.get('access_token')?.value;
  if (!token) redirect('/login');

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const [profileRes, conversationsRes] = await Promise.all([
    fetch(`${EXTERNAL_API_BASE}/users/profile`, { headers, next: { tags: ['profile'] } }),
    fetch(`${EXTERNAL_API_BASE}/conversations`, { headers }),
  ]);

  if (profileRes.status === 401) redirect('/login');

  const [conversations, profile] = await Promise.all([conversationsRes.json(), profileRes.json()]);

  return (
    <AuthProvider profile={profile} token={token}>
      <Toaster position="top-center" reverseOrder={false} />
      <SocketProvider>
        <ConversationProvider>
          <Aside conversations={conversations} />
          {children}
        </ConversationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
