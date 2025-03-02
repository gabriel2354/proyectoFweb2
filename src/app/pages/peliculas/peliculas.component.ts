import { Component, OnInit } from '@angular/core';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];  
  modalVisible: boolean = false;  
  peliculaSeleccionada: Pelicula = {} as Pelicula;  
  usuarioNombre: string = '';  

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.cargarPeliculas();  

    
    this.usuarioNombre = localStorage.getItem('usuarioNombre') || 'Invitado';  // Si no hay usuario, asignamos 'Invitado'
  }

  cargarPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(
      (data: any) => {  
        console.log(data);  

        
        if (Array.isArray(data)) {
          this.peliculas = data;  
        } else if (data.peliculas && Array.isArray(data.peliculas)) {
          this.peliculas = data.peliculas;  
        } else {
          this.peliculas = [];  // Si no se encuentran las películas, asignamos un array vacío
        }
      },
      (error) => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

  // Mostrar el modal con los detalles de la película seleccionada
  mostrarModal(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula;
    this.modalVisible = true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.modalVisible = false;
  }

  // Confirmar la compra
  comprar() {
    alert(`¡Compra exitosa! Has comprado un boleto para "${this.peliculaSeleccionada.nombre}"`);
    this.cerrarModal();  // Cerrar el modal después de la compra
  }
}
