import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Asegúrate de importar map

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
  verificarCredenciales(correo: string, contrasena: string): Observable<Usuario | null> {
    // Filtra los usuarios que coincidan con el correo y la contraseña
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios: Usuario[]) => {
        return usuarios.find(
          usuario => usuario.correo === correo && usuario.contrasena === contrasena
        ) || null; // Si no se encuentra, devuelve null
      })
    );
  }
}
