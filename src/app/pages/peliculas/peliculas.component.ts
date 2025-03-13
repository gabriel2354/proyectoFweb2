import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, AfterViewInit {
  peliculas: Pelicula[] = [];
  modalVisible: boolean = false;
  peliculaSeleccionada: Pelicula = {} as Pelicula;
  usuarioNombre: string = 'Invitado';
  usuarioCorreo: string = 'Invitado';
  error: string | null = null;
  successMessage: string | null = null;
  carrito: Pelicula[] = [];
  total: number = 0;

  constructor(private peliculasService: PeliculasService, private router: Router, private zone: NgZone) {}

  ngOnInit(): void {
    this.cargarPeliculas();

    const usuario = localStorage.getItem('usuarios');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.usuarioNombre = usuarioObj.nombre;
      this.usuarioCorreo = usuarioObj.correo;
    }

    // Cargar el carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.total = this.carrito.reduce((acc, pelicula) => acc + pelicula.precio, 0);  // Calcular el total
    }
  }

  ngAfterViewInit(): void {
    this.autoSlide();  // Llamamos a la función de auto deslizamiento después de que la vista se haya inicializado
  }

  cargarPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.peliculas = data;
        } else if (data.peliculas && Array.isArray(data.peliculas)) {
          this.peliculas = data.peliculas;
        } else {
          this.peliculas = [];
        }
      },
      (error) => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

  mostrarModal(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.error = '';
  }

  agregarAlCarrito(pelicula: Pelicula) {
    this.carrito.push(pelicula);
    this.total += pelicula.precio;

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    // Verifica el carrito después de agregar un producto
    console.log('Carrito actualizado:', this.carrito);
  }

  mostrarModalCarrito() {
    this.modalVisible = true;
  }

  eliminarDelCarrito(index: number) {
    this.total -= this.carrito[index].precio;
    this.carrito.splice(index, 1);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    // Verifica el carrito después de eliminar un producto
    console.log('Carrito después de eliminar:', this.carrito);
  }

  comprar() {
    const usuario = localStorage.getItem('usuarios');
    if (!usuario) {
      this.error = 'Debes iniciar sesión para comprar';
      setTimeout(() => {
        this.zone.run(() => {
          this.router.navigate(['/inicio-sesion']);  // Redirige al inicio de sesión si no está logueado
        });
      }, 2000);
      return;
    }

    const usuarioObj = JSON.parse(usuario);

    // Guardamos los datos de la factura en localStorage para usarlos en el componente de factura
    const factura = {
      usuario: usuarioObj.nombre,
      apellido: usuarioObj.apellido,
      correo: usuarioObj.correo,
      direccion: usuarioObj.direccion,  // Incluimos la dirección también
      peliculas: this.carrito,
      total: this.total
    };

    // Guardar factura en localStorage
    localStorage.setItem('factura', JSON.stringify(factura));

    // Limpiar el carrito y el total después de 3 segundos
    setTimeout(() => {
      this.successMessage = null;
      this.carrito = [];
      this.total = 0;
      localStorage.removeItem('carrito'); // Limpiar carrito de localStorage
      this.router.navigate(['/factura']);  // Redirigir al componente de factura
    }, 3000);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarios');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('tipo');
    this.usuarioNombre = 'Invitado';
    this.usuarioCorreo = 'Invitado';
    this.router.navigate(['/inicio-sesion']);
  }

// Función de auto deslizamiento del carrusel
autoSlide() {
  let currentIndex = 0;
  const carousel = document.querySelector("#carousel") as HTMLElement;
  const carouselImages = document.querySelectorAll("#carousel img");
  const totalImages = carouselImages.length;

  // Función para avanzar al siguiente slide
  const moveNext = () => {
    currentIndex++;
    if (currentIndex >= totalImages / 2) {  // Ajustamos el límite para que al llegar a la mitad de las imágenes duplicadas, vuelva al inicio
      currentIndex = 0; // Si llegamos al final de las imágenes duplicadas, volvemos al inicio
      carousel.style.transition = 'none'; // Desactivamos la transición para un cambio abrupto
      carousel.style.transform = `translateX(0)`;  // Volvemos al inicio
      setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';  // Reactivamos la transición
      }, 50); // Esperamos un breve momento para que se reanude la transición
    }
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;  // Mover el carrusel
  };

  // Hacer que el carrusel avance cada 3 segundos
  setInterval(moveNext, 3000);
}
}