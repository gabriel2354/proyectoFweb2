import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo para los datos de los clientes
export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  username: string;
  contrasena: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // URL de la API para los clientes
  private apiUrl = 'http://localhost:8080/clientes';  // Cambié la URL al endpoint correcto para clientes

  constructor(private http: HttpClient) { }

  // Método POST: Crear un nuevo cliente
  registrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/guardarCliente`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'  // Asegura que el cuerpo se envíe como JSON
      })
    });
  }

  // Método GET: Obtener todos los clientes o filtrar por nombre
  obtenerClientes(buscarCliente: string = ''): Observable<Cliente[]> {
    const url = `${this.apiUrl}?buscarCliente=${buscarCliente}`;
    return this.http.get<Cliente[]>(url);
  }

  // Método PUT: Actualizar un cliente
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/editar/${id}`, cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'  // Asegura que el cuerpo se envíe como JSON
      })
    });
  }

  // Método DELETE: Eliminar un cliente
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
