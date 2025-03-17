import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';  // Asegúrate de importar el servicio adecuado
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes-registro',
  standalone: true,
  imports: [FormsModule],  // Importa FormsModule para formularios en Angular
  templateUrl: './clientes-registro.component.html',
  styleUrls: ['./clientes-registro.component.css']
})
export class ClientesRegistroComponent {
  // Inicializa las propiedades del formulario
  nombre: string = '';
  apellido: string = '';
  edad: number = 0;
  correo: string = '';
  direccion: string = '';
  contrasena: string = '';

  // Inyecta el servicio de Clientes
  constructor(private servicio: ClientesService, private router: Router) {}

  // Método para guardar los datos del formulario
  guardar(formulario: any) {
    // Envía los datos del formulario al servicio para registrar el cliente
    this.servicio.registrarCliente(formulario.value).subscribe(
      response => {
        console.log('Cliente registrado con éxito:', response);  // Muestra respuesta al registrar
        window.location.reload(); // Recarga la página después de enviar
      },
      error => {
        console.error('Error al registrar cliente:', error);  // Muestra el error si algo falla
      }
    );
    this.router.navigate(['/inicio-sesion']);
  }
}
