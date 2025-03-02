import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir un modelo básico para las películas (puedes agregar más campos según lo necesites)
export interface Pelicula {
  id?: number;
  nombre: string;
  descripcion: string;
  genero: string;
  duracion: number;
  ano: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:3000/peliculas'; // URL de tu backend, puedes cambiarla por la tuya

  constructor(private http: HttpClient) { }

  // Método GET: Obtener todas las películas
  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Método POST: Crear una nueva película
  agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  // Método PUT: Actualizar una película
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
