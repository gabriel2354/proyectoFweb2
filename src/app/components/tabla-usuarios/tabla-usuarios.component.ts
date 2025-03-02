import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Añadido

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Asegúrate de agregar CommonModule aquí
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent {
  usuarios: any[] = [];  // Array para almacenar los usuarios
  formularioVisible: boolean = false;
  formularioUsuario: boolean = false;  // Determina si estamos editando un usuario
  usuario: any = {};  // Almacena los datos del usuario a editar/agregar

  constructor(private usuariosService: UsuariosService) {
    this.cargarUsuarios();
  }

  // Función para cargar los usuarios
  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Eliminar un usuario
  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(
        () => {
          this.cargarUsuarios();
          console.log('Usuario eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }

  // Editar un usuario
  editarUsuario(usuario: any) {
    this.usuario = { ...usuario };  // Copiar los datos del usuario a editar
    this.formularioUsuario = true;
    this.formularioVisible = true;
  }

  // Mostrar formulario para agregar nuevo usuario
  mostrarFormularioNuevo() {
    this.usuario = {};  // Limpiar los datos del formulario
    this.formularioUsuario = false;
    this.formularioVisible = true;
  }

  // Guardar usuario (agregar o editar)
  guardar(formulario: any) {
    if (this.formularioUsuario) {
      this.usuariosService.actualizarUsuario(this.usuario.id, formulario.value).subscribe(
        () => {
          this.cargarUsuarios();
          this.formularioVisible = false;
          console.log('Usuario actualizado con éxito');
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    } else {
      this.usuariosService.registrarUsuario(formulario.value).subscribe(
        () => {
          this.cargarUsuarios();
          this.formularioVisible = false;
          console.log('Usuario registrado con éxito');
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }
}



