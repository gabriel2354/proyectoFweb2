import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-administrador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent {
  administrador: any = {};  // Objeto para guardar los datos del administrador

  // Inyectar el servicio de administradores
  constructor(private servicio: AdministradorService) {}

  // Método para guardar los datos del formulario
  guardar(formulario: any) {
    // Enviar los datos del formulario tal cual sin encriptación (json-server se encargará de ello)
    this.servicio.postAdministrador(formulario.value).subscribe(
      (response) => {
        console.log('Administrador registrado con éxito:', response);
        window.location.reload();  // Recarga la página después de enviar
      },
      (error) => {
        console.error('Error al registrar administrador:', error);
      }
    );
  }
}
