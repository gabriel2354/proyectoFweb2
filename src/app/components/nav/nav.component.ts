import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  menuVisible = false;
  nombreUsuario: string | null = ''; // Variable para almacenar el nombre del usuario
  isLoggedIn: boolean = false; // Variable para saber si el usuario está logueado

  constructor(private router: Router) {}  // Inyecta el servicio Router en el constructor

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    // Recuperar el nombre del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem('usuarioNombre');
    
    // Si el nombre del usuario existe, está logueado
    this.isLoggedIn = this.nombreUsuario !== null;
  }

  // Método para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('usuarioNombre');  // Eliminar el nombre del usuario
    this.nombreUsuario = '';  // Limpiar la variable
    this.isLoggedIn = false;  // Cambiar el estado de logueo
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
