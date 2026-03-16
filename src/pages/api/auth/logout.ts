// src/pages/api/auth/logout.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('app_session', { path: '/' });
  cookies.delete('meli_access_token', { path: '/' });
  return redirect('/');
};