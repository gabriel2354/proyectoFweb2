import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink, RouterModule } from '@angular/router';  // Importa Router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  correo: string = '';
  contrasena: string = '';
  error: string = ''; // Variable para mostrar errores
  passwordVisible: boolean = false;

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  // Método para iniciar sesión
  iniciarSesion() {
    // No encriptamos la contraseña aquí, se enviará tal cual al backend
    this.usuariosService.verificarCredenciales(this.correo, this.contrasena).subscribe(
      (resultado) => {
        if (resultado) {
          // Guardar datos en localStorage
          localStorage.setItem('usuarios', JSON.stringify(resultado.datos));
          localStorage.setItem('tipo', resultado.tipo);
          localStorage.setItem('nombreUsuario', resultado.datos.nombre);
          // Redirigir según el tipo
          if (resultado.tipo === 'admin') {
            this.router.navigate(['/administrador']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.error = 'Correo o contraseña incorrectos';
        }
      },
      (error) => {
        console.error('Error al verificar credenciales', error);
        this.error = 'Hubo un problema al verificar tus credenciales';
      }
    );
  }

  // Función para hacer visible/invisible la contraseña
  visible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
