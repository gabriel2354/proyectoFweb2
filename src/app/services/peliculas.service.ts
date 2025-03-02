import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir un modelo básico para las películas (con los campos precio e imagen)
export interface Pelicula {
  id?: number;
  nombre: string;
  descripcion: string;
  genero: string;
  duracion: number;
  ano: number;
  precio: number;  // Nuevo campo: precio de la película
  imagen: string;  // Nuevo campo: URL de la imagen de la película
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:3000/peliculas'; // URL del backend (puedes cambiarla si es necesario)

  constructor(private http: HttpClient) { }

  // Método GET: Obtener todas las películas
  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Método POST: Crear una nueva película (con los campos 'precio' e 'imagen')
  agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  // Método PUT: Actualizar una película (con los campos 'precio' e 'imagen')
  actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula);
  }

  // Método DELETE: Eliminar una película
  eliminarPelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método GET: Obtener una película por ID
  obtenerPeliculaPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }
}
