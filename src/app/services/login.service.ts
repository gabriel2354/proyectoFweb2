import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define la estructura de la respuesta del login
interface LoginResponse {
  token: string;  // Suponiendo que recibes un token JWT al hacer login
  nombre: string;
  correo: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login'; // Endpoint de login en el backend

  constructor(private http: HttpClient) {}

  // Método para verificar las credenciales del usuario
  login(correo: string, contrasena: string): Observable<LoginResponse> {
    const body = { correo, contrasena };  // Pasar como cuerpo en lugar de parámetros de la URL

    // Realiza el POST al backend y obtiene el token de autenticación
    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      catchError((error) => {
        console.error('Error al hacer login', error);
        return throwError(() => new Error('Credenciales incorrectas'));
      })
    );
  }

  // Método para guardar los datos de la sesión en localStorage
  setSessionData(data: LoginResponse): void {
    // Guardamos el token JWT y otros datos
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('nombreUsuario', data.nombre);
    localStorage.setItem('correoUsuario', data.correo);
    localStorage.setItem('rolUsuario', data.rol);
  }

  // Método para obtener el token de la sesión desde localStorage
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para obtener el rol del usuario desde localStorage
  getUserRole(): string | null {
    return localStorage.getItem('rolUsuario');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;  // Verifica si el token está presente
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('correoUsuario');
    localStorage.removeItem('rolUsuario');
  }

  // Método para agregar el token en las cabeceras de futuras solicitudes
  getHttpHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : '');  // Añadir el token si existe
  }
}
