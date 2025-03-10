import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Usar inyección de dependencias para router
  const usuario = JSON.parse(localStorage.getItem('usuarios') || '{}'); // Obtener el usuario del localStorage

  // Si el usuario no está autenticado, redirigir al login
  if (!usuario || !usuario.rol) {
    router.navigate(['/inicio-sesion']);
    return false;
  }

  // Si el usuario es administrador, puede acceder a todas las rutas
  if (usuario.rol === 'administrador') {
    return true;
  }

  // Si el usuario es cliente, permitir solo el acceso a home y peliculas
  const rutasPermitidas = ['/home', '/peliculas','/registro-usuarios'];
  if (rutasPermitidas.includes(state.url)) {
    return true;
  }

  // Redirigir a inicio de sesión si el usuario no tiene permisos para la ruta
  router.navigate(['/inicio-sesion']);
  return false;
};
