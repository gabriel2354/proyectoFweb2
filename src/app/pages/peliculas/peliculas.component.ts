import { Component, NgZone, OnInit } from '@angular/core';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

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
  error:string | null=null;
  successMessage: string | null = null;
  constructor(private peliculasService: PeliculasService, private router:Router,private zone:NgZone ) {}

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
    this.error='';
  }

  // Confirmar la compra
  comprar() {
    console.log('Compra ejecutada');
    
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
      console.log('Usuario no autenticado. Redirigiendo...');
      this.error = 'Debes iniciar sesión para comprar';
  
      setTimeout(() => {
        this.zone.run(() => {
          this.router.navigate(['/inicio-sesion']);
        });
      }, 2000);
      return;
    }
  
    const usuarioObj = JSON.parse(usuario);
  
    if (usuarioObj.tipo == 'usuario') {
      console.log('Solo los clientes pueden comprar');
      this.error = 'Solo los clientes pueden realizar compras';
      return;
    }
  
    // Simulación de compra exitosa
    this.successMessage = '¡Gracias por tu compra! 🎉';
    console.log(this.successMessage);
  
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  
    setTimeout(() => {
      this.cerrarModal();
    }, 4000);
  }
  
}
