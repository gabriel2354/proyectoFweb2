import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectofweb2';
  isLoginPage = false;
  isRegisterPage = false; // Variable para verificar la página de registro

  constructor(private router: Router) {
    // Suscripción a los eventos de navegación para detectar si estamos en la página de login o registro
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Establece isLoginPage a true si la ruta es 'inicio-sesion'
        this.isLoginPage = event.url === '/inicio-sesion';
        // Establece isRegisterPage a true si la ruta es 'registro-usuarios'
        this.isRegisterPage = event.url === '/registro-usuarios';
      }
    });
  }
}
