// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // 1. Extraer los datos del formulario que viene del LoginForm
  const data = await request.formData();
  const user = data.get('username');
  const pass = data.get('password');

  // 2. Obtener las credenciales que definiste en tu panel de Coolify / .env
  const ADMIN_USER = import.meta.env.APP_ADMIN_USER;
  const ADMIN_PASS = import.meta.env.APP_ADMIN_PASS;

  // 3. Validar si coinciden
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    // Si es correcto, creamos una cookie para "recordar" la sesión de tu app
    cookies.set('app_session', 'authenticated', {
      path: '/',
      httpOnly: true, // No accesible por JS del cliente (más seguro)
      secure: true,   // Solo vía HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // La sesión dura 24 horas
    });

    // Redirigimos al dashboard
    return redirect('/dashboard');
  }

  // 4. Si falló, lo mandamos de vuelta al login con un parámetro de error
  return redirect('/?error=invalid_credentials');
};