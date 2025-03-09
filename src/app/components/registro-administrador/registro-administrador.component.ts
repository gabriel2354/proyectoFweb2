import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-administrador',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro-administrador.component.html',
  styleUrl: './registro-administrador.component.css'
})
export class RegistroAdministradorComponent {
// Inyectar el servicio de administradores
constructor(private servicio: AdministradorService) {}
administrador: any = {};
// Método para guardar los datos del formulario
guardar(formulario: any) {
  // Envía los datos del formulario al servicio para registrar el administrador
  this.servicio.postAdministrador(formulario.value).subscribe(
    response => {
      console.log('Administrador registrado con éxito:', response); // Muestra respuesta al registrar
      window.location.reload(); // Recarga la página después de enviar
    },
    error => {
      console.error('Error al registrar administrador:', error); // Muestra el error si algo falla
    }
  );
}

}
