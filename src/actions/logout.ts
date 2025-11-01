'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookiesObj = await cookies();
  cookiesObj.delete('access_token');
  redirect('/login');
}
