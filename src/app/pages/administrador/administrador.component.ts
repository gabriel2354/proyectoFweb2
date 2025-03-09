import { Component } from '@angular/core';
import { TablaAdministradorComponent } from "../../components/tabla-administrador/tabla-administrador.component";
import { RegistroAdministradorComponent } from "../../components/registro-administrador/registro-administrador.component";

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [TablaAdministradorComponent, RegistroAdministradorComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

}
