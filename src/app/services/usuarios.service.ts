import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API_USUARIOS = 'http://localhost:8080/usuarios';  // Asegúrate de que esta URL sea la correcta para tu backend

  constructor(private http: HttpClient) {}

  // Servicio para registrar un nuevo usuario (Administrador o Cliente)
  postUsuario(usuario: any): Observable<any> {  // Mantén 'any' si no estás usando interfaces
    return this.http.post(`${this.API_USUARIOS}/guardar`, usuario).pipe(  // Asegúrate de que la ruta coincide con tu controlador
      catchError(this.handleError) 
    );
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {  // 'any' es el tipo aquí
    return this.http.get(this.API_USUARIOS).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.API_USUARIOS}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_USUARIOS}/eliminar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un usuario
  putUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.API_USUARIOS}/editar/${usuario.id}`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error', error);
    return throwError('Hubo un problema al procesar la solicitud. Intenta más tarde.');
  }
}
