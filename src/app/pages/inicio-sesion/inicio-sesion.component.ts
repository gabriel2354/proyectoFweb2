import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';  // Importa Router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  correo: string = '';
  contrasena: string = '';
  error: string = ''; // Variable para mostrar errores

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  // Método para iniciar sesión
  iniciarSesion() {
    this.usuariosService.verificarCredenciales(this.correo, this.contrasena).subscribe(
      (usuario) => {
        if (usuario) {
          // Si las credenciales son correctas, almacenar el nombre en localStorage
          localStorage.setItem('usuarioNombre', usuario.nombre); // Almacenar el nombre del usuario
          
          // Redirigir a la página de inicio
          this.router.navigate(['/']);  // Redirige a la página de inicio (home)
        } else {
          this.error = 'Correo o contraseña incorrectos';
        }
      },
      (error) => {
        console.error('Error al verificar las credenciales', error);
        this.error = 'Hubo un problema al verificar tus credenciales';
      }
    );
  }
}
