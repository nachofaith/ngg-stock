// src/pages/api/auth/callback.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');

  if (!code) return new Response("No code provided", { status: 400 });

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', import.meta.env.MELI_CLIENT_ID);
    params.append('client_secret', import.meta.env.MELI_CLIENT_SECRET);
    params.append('code', code);
    params.append('redirect_uri', import.meta.env.MELI_REDIRECT_URI);

    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const data = await response.json();

    if (data.access_token) {
      // Guardamos el token de MeLi en una cookie
      cookies.set('meli_access_token', data.access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 21600 // 6 horas
      });
      
      // También podrías guardar el refresh_token aquí si usas DB después
    }

    return redirect('/dashboard');
  } catch (error) {
    return new Response("Error al conectar con MeLi", { status: 500 });
  }
};