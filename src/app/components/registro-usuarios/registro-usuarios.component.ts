import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-usuarios',  // Cambié el nombre del selector a 'registro-usuarios'
  standalone: true,
  imports: [FormsModule],  // Mantén esta importación si estás usando formularios en Angular
  templateUrl: './registro-usuarios.component.html',  // Cambié el nombre del archivo HTML
  styleUrls: ['./registro-usuarios.component.css']  // Cambié el nombre del archivo CSS
})
export class RegistroUsuariosComponent {
  // Inicializa las propiedades del formulario
  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  correo: string = '';
  direccion: string = '';
  contrasena: string = '';
  rol: string = 'cliente';  // Valor por defecto de 'cliente'

  // Inyectar el servicio de usuarios
  constructor(private servicio: UsuariosService) {}

  // Método para guardar los datos del formulario
  guardar(formulario: any) {
    // Envía los datos del formulario al servicio para registrar el usuario
    this.servicio.registrarUsuario(formulario.value).subscribe(
      response => {
        console.log('Usuario registrado con éxito:', response);  // Muestra respuesta al registrar
        window.location.reload(); // Recarga la página después de enviar
      },
      error => {
        console.error('Error al registrar usuario:', error);  // Muestra el error si algo falla
      }
    );
  }
}
