import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importa Router para la navegación
import { LoginService } from '../../services/login.service';  // Importa el servicio de Login
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],  // Asegúrate de que tienes FormsModule y CommonModule si usas formularios
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  correo: string = '';
  contrasena: string = '';
  error: string = ''; // Variable para mostrar errores
  passwordVisible: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  // Función para hacer visible/invisible la contraseña
  visible() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Función para hacer login
  login() {
    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    this.loginService.login(this.correo, this.contrasena).subscribe(
      (data) => {
        // Al recibir la respuesta, guardamos los datos de la sesión
        this.loginService.setSessionData(data);

        // Redirigir a la página principal (ajustar la ruta de acuerdo a la aplicación)
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Correo o contraseña incorrectos. Intenta nuevamente.';
        console.error('Error al hacer login', error);
      }
    );
  }
}
