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
  // Cambiar la URL para que coincida con la del backend de Spring Boot
  private apiUrl = 'http://localhost:8080/peliculas'; // URL del backend (ajusta según sea necesario)

  constructor(private http: HttpClient) { }

  // Método GET: Obtener todas las películas
  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Método POST para agregar una nueva película
agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
  return this.http.post<Pelicula>(`${this.apiUrl}/guardar`, pelicula, {
    headers: {
      'Content-Type': 'application/json' // Asegura que el cuerpo sea enviado como JSON
    }
  });
}

// Método PUT para actualizar una película existente
actualizarPelicula(id: number, pelicula: Pelicula): Observable<Pelicula> {
  return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, pelicula); // Cambié la URL aquí
}


 // Método DELETE: Eliminar una película
 eliminarPelicula(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);  // Llama al endpoint DELETE
}

  // Método GET: Obtener una película por ID
  obtenerPeliculaPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }
}
