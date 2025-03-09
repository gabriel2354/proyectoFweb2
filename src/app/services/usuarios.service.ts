import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';  // Asegúrate de importar map

// Modelo para los datos de los usuarios
interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  usuario: string;
  contrasena: string;
  direccion: string;
  rol: string;  // Añadido el campo rol
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // Cambié la ruta al endpoint de JSON Server
  private apiUrl = 'http://localhost:3000/usuarios'; // Endpoint de JSON Server
  private ApiAdmin = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // Método POST: Crear un nuevo usuario
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);  // Esperamos que la respuesta sea del tipo Usuario
  }

  // Método GET: Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Método PUT: Actualizar un usuario
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // Método DELETE: Eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método adicional: Verificar credenciales del usuario para inicio de sesión

  verificarCredenciales(
    correo: string, 
    contrasena: string
  ): Observable<{ tipo: 'usuario' | 'admin'; datos: any } | null> { // <--- Tipo explícito
    return this.http.get<any[]>(`${this.ApiAdmin}/usuarios`).pipe(
      map((usuarios: any[]) => {
        const usuarioEncontrado = usuarios.find(
          u => u.correo === correo && u.contrasena === contrasena
        );
        return usuarioEncontrado 
          ? { tipo: 'usuario' as const, datos: usuarioEncontrado } // <--- 'as const' para tipo literal
          : null;
      }),
      switchMap((resultado) => {
        if (!resultado) {
          return this.http.get<any[]>(`${this.ApiAdmin}/administrador`).pipe(
            map((administradores: any[]) => {
              const adminEncontrado = administradores.find(
                a => a.correo === correo && a.contrasena === contrasena
              );
              return adminEncontrado 
                ? { tipo: 'admin' as const, datos: adminEncontrado } // <--- 'as const' aquí también
                : null;
            })
          );
        } else {
          return of(resultado);
        }
      })
    );
  }
  
}
