import { Component } from '@angular/core';

import { TablaUsuariosComponent } from '../../components/tabla-usuarios/tabla-usuarios.component';


@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [TablaUsuariosComponent, ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

}
