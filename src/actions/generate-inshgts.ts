'use server';

import { EXTERNAL_API_BASE } from '@/constants';
import { ActionState } from '@/types/action-state';
import { Insight } from '@/types/insight';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function generateInsights(
  prevState: ActionState<Insight>,
  formData: FormData
): Promise<ActionState<Insight>> {
  if (!EXTERNAL_API_BASE) return { message: 'Missing EXTERNAL_API_BASE', success: null };

  const cookiesObj = await cookies();
  const token = cookiesObj.get('access_token')?.value;
  if (!token) redirect('/login');

  const targetUrl = `${EXTERNAL_API_BASE.replace(/\/$/, '')}/insights/${formData.get('conversationId')}`;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(targetUrl, { method: 'POST', headers });
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) redirect('/login');
  if (!res.ok) return { message: data.message, success: false };
  return { message: 'success', success: true, data };
}
