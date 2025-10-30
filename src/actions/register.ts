'use server';

import { EXTERNAL_API_BASE } from '@/constants';
import { ActionState } from '@/types/action-state';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!EXTERNAL_API_BASE) return { message: 'Missing EXTERNAL_API_BASE', success: false };

  const targetUrl = `${EXTERNAL_API_BASE.replace(/\/$/, '')}/auth/register`;

  const bodyObj = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const res = await fetch(targetUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) return { message: data.message, success: false };

  const cookiesObj = await cookies();
  cookiesObj.set('access_token', data.access_token);

  redirect('/');
}
