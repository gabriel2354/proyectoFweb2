import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  nombreUsuario: string | null = ''; // Variable para almacenar el nombre del usuario
  tipoUsuario: string | null = '';
  isLoggedIn: boolean = false; 
  isAdmin: boolean = false; 
  isAdminMenuOpen = false;

  constructor(private router: Router) {
    this.isAdmin = localStorage.getItem('tipo') === 'administrador';

  }  // Inyecta el servicio Router en el constructor

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    this.tipoUsuario = localStorage.getItem('tipo');

    // Verificar si el usuario está logueado
    this.isLoggedIn = this.nombreUsuario !== null && this.tipoUsuario !== null; 
  }

  toggleAdminMenu() {
    this.isAdminMenuOpen = !this.isAdminMenuOpen;
  }

  // Cierra el menú al hacer clic fuera
  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.admin-menu-container')) {
      this.isAdminMenuOpen = false;
    }
  }

  // Método para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('usuarios');
    localStorage.removeItem('tipo');
    localStorage.removeItem('nombreUsuario');
    this.tipoUsuario = null;
    this.router.navigate(['/inicio-sesion']); // Redirigir al login // Redirigir al login
  }
}
