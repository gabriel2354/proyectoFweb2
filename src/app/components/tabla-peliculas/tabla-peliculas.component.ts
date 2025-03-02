import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Asegúrate de importar el CommonModule

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de incluir CommonModule aquí
  templateUrl: './tabla-peliculas.component.html',
  styleUrls: ['./tabla-peliculas.component.css']
})
export class TablaPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];  // Array para almacenar las películas
  formularioVisible = false;  // Determina si mostramos el formulario de agregar/editar
  formularioPelicula = false;  // Determina si estamos editando una película
  pelicula: Pelicula = {} as Pelicula;  // Objeto para la película a editar o agregar

  constructor(private peliculasService: PeliculasService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPeliculas();  // Cargamos las películas al iniciar el componente
  }

  cargarPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(
      (data) => {
        this.peliculas = data;
      },
      (error) => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

  eliminarPelicula(id: number | undefined) {
    if (id === undefined) {
      console.error('ID no válido');
      return; // No procedemos si el ID es inválido
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.peliculasService.eliminarPelicula(id).subscribe(
        () => {
          this.cargarPeliculas();  // Recargamos la lista de películas después de eliminar
          console.log('Película eliminada con éxito');
        },
        (error) => {
          console.error('Error al eliminar la película:', error);
        }
      );
    }
  }
  

  editarPelicula(pelicula: Pelicula) {
    this.pelicula = { ...pelicula };  // Copiamos los datos de la película
    this.formularioPelicula = true;  // Indicamos que estamos editando una película
    this.formularioVisible = true;  // Mostramos el formulario
  }

  mostrarFormularioNuevo() {
    this.pelicula = {} as Pelicula;  // Limpiamos el formulario
    this.formularioPelicula = false;  // Indicamos que no estamos editando
    this.formularioVisible = true;  // Mostramos el formulario
  }

  guardar(formulario: any) {
    if (this.formularioPelicula) {
      // Si estamos editando, actualizamos la película
      this.peliculasService.actualizarPelicula(this.pelicula.id!, formulario.value).subscribe(
        () => {
          this.cargarPeliculas();
          this.formularioVisible = false;  // Ocultamos el formulario después de guardar
          console.log('Película actualizada con éxito');
        },
        (error) => {
          console.error('Error al actualizar la película:', error);
        }
      );
    } else {
      // Si no estamos editando, agregamos una nueva película
      this.peliculasService.agregarPelicula(formulario.value).subscribe(
        () => {
          this.cargarPeliculas();  // Recargamos las películas después de agregar
          this.formularioVisible = false;  // Ocultamos el formulario después de guardar
          console.log('Película agregada con éxito');
        },
        (error) => {
          console.error('Error al agregar la película:', error);
        }
      );
    }
  }
}
