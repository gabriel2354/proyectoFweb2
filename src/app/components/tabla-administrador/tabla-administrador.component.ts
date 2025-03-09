import { Component } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-administrador',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tabla-administrador.component.html',
  styleUrl: './tabla-administrador.component.css'
})
export class TablaAdministradorComponent {
  administradores: any[] = [];  // Array para almacenar los administradores
  formularioVisible: boolean = false;
  formularioAdministrador: boolean = false;  // Determina si estamos editando un administrador
  administrador: any = {};  // Almacena los datos del administrador a editar/agregar
  
  constructor(private administradoresService: AdministradorService) {
    this.cargarAdministradores();
  }
  
  // Función para cargar los administradores
  cargarAdministradores() {
    this.administradoresService.getAdministradores().subscribe(
      (data) => {
        this.administradores = data;
      },
      (error) => {
        console.error('Error al cargar los administradores:', error);
      }
    );
  }
  
  // Eliminar un administrador
  eliminarAdministrador(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
      this.administradoresService.deleteAdministrador(id).subscribe(
        () => {
          this.cargarAdministradores();
          console.log('Administrador eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el administrador:', error);
        }
      );
    }
  }
  
  // Editar un administrador
  editarAdministrador(administrador: any) {
    this.administradoresService.getAdministradorById(administrador.id).subscribe(
      (data) => {
        this.administrador = { ...data };  // Cargar los datos del administrador seleccionado
        this.formularioAdministrador = true;
        this.formularioVisible = true;
      },
      (error) => {
        console.error('Error al obtener el administrador:', error);
      }
    );
  }
  
  // Mostrar formulario para agregar nuevo administrador
  mostrarFormularioNuevo() {
    this.administrador = {};  // Limpiar los datos del formulario
    this.formularioAdministrador = false;
    this.formularioVisible = true;
  }
  
  // Guardar administrador (agregar o editar)
  guardar(formulario: any) {
    if (this.formularioAdministrador) {
      // Actualizar administrador
      this.administradoresService.postAdministrador({ ...this.administrador, ...formulario.value }).subscribe(
        () => {
          this.cargarAdministradores();
          this.formularioVisible = false;
          console.log('Administrador actualizado con éxito');
        },
        (error) => {
          console.error('Error al actualizar el administrador:', error);
        }
      );
    } else {
      // Registrar nuevo administrador
      this.administradoresService.postAdministrador(formulario.value).subscribe(
        () => {
          this.cargarAdministradores();
          this.formularioVisible = false;
          console.log('Administrador registrado con éxito');
        },
        (error) => {
          console.error('Error al registrar el administrador:', error);
        }
      );
    }
  }
  
}
