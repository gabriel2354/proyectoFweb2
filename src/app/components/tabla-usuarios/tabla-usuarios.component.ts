import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service'; // Asegúrate de tener el servicio para usuarios
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent {
  usuarios: any[] = [];
  formularioVisible: boolean = false;
  formularioUsuario: boolean = false;
  usuario: any = {};

  constructor(private usuariosService: UsuariosService) {
    this.cargarUsuarios();
  }

  // Cargar usuarios desde el backend
  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe(
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

  // Editar usuario
  editarUsuario(usuario: any) {
    this.usuariosService.getUsuarioById(usuario.id).subscribe(
      (data) => {
        this.usuario = { ...data };
        this.formularioUsuario = true;
        this.formularioVisible = true;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  // Mostrar formulario para agregar nuevo usuario
  mostrarFormularioNuevo() {
    this.usuario = {};
    this.formularioUsuario = false;
    this.formularioVisible = true;
  }

  // Guardar usuario (agregar o editar)
  guardar(formulario: any) {
    if (!this.usuario.contrasena || this.usuario.contrasena.trim() === "") {
      alert("La contraseña no puede estar vacía.");
      return;
    }

    if (this.formularioUsuario) {
      // Actualizar usuario
      this.usuariosService.putUsuario({ ...this.usuario, ...formulario.value }).subscribe(
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
      // Crear nuevo usuario
      this.usuariosService.postUsuario(formulario.value).subscribe(
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
