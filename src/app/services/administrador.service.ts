import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Importa catchError para manejar errores

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private API_ADMINISTRADORES = 'http://localhost:3000/administrador'; 

  constructor(private http: HttpClient) {}

  // Método POST: Crear un nuevo administrador
  postAdministrador(administrador: any): Observable<any> {
    return this.http.post(this.API_ADMINISTRADORES, administrador).pipe(
      catchError(this.handleError)  // Agrega manejo de errores
    );
  }

  // Mostrar administradores
  getAdministradores(): Observable<any> {
    return this.http.get(this.API_ADMINISTRADORES).pipe(
      catchError(this.handleError)  // Agrega manejo de errores
    );
  }

  // Mostrar administrador por ID
  getAdministradorById(id: any): Observable<any> {
    return this.http.get(`${this.API_ADMINISTRADORES}/${id}`).pipe(
      catchError(this.handleError)  // Agrega manejo de errores
    );
  }

  // Eliminar administrador
  deleteAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.API_ADMINISTRADORES}/${id}`).pipe(
      catchError(this.handleError)  // Agrega manejo de errores
    );
  }

  // Actualizar administrador
  putAdministrador(administrador: any): Observable<any> {
    return this.http.put(`${this.API_ADMINISTRADORES}/${administrador.id}`, administrador).pipe(
      catchError(this.handleError)  // Agrega manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error', error);  // Muestra el error en la consola
    return throwError('Hubo un problema al procesar la solicitud. Intenta más tarde.');  // Mensaje de error personalizado
  }
}
