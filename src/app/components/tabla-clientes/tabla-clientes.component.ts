import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Asegúrate de agregar CommonModule aquí

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de agregar CommonModule aquí
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent {
  clientes: any[] = [];  // Array para almacenar los clientes
  formularioVisible: boolean = false;
  formularioCliente: boolean = false;  // Determina si estamos editando un cliente
  cliente: any = {};  // Almacena los datos del cliente a editar/agregar

  constructor(private clientesService: ClientesService) {
    this.cargarClientes();
  }

  // Función para cargar los clientes
  cargarClientes() {
    this.clientesService.obtenerClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al cargar los clientes:', error);
      }
    );
  }

  // Eliminar un cliente
  eliminarCliente(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clientesService.eliminarCliente(id).subscribe(
        () => {
          this.cargarClientes();
          console.log('Cliente eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el cliente:', error);
        }
      );
    }
  }

  // Editar un cliente
  editarCliente(cliente: any) {
    this.cliente = { ...cliente };  // Copiar los datos del cliente a editar
    this.formularioCliente = true;
    this.formularioVisible = true;
  }

  // Mostrar formulario para agregar nuevo cliente
  mostrarFormularioNuevo() {
    this.cliente = {};  // Limpiar los datos del formulario
    this.formularioCliente = false;
    this.formularioVisible = true;
  }

  // Guardar cliente (agregar o editar)
  guardarCliente(formulario: any) {
    if (this.formularioCliente) {
      this.clientesService.actualizarCliente(this.cliente.id, formulario.value).subscribe(
        () => {
          this.cargarClientes();
          this.formularioVisible = false;
          console.log('Cliente actualizado con éxito');
        },
        (error) => {
          console.error('Error al actualizar el cliente:', error);
        }
      );
    } else {
      this.clientesService.registrarCliente(formulario.value).subscribe(
        () => {
          this.cargarClientes();
          this.formularioVisible = false;
          console.log('Cliente registrado con éxito');
        },
        (error) => {
          console.error('Error al registrar el cliente:', error);
        }
      );
    }
  }
}
