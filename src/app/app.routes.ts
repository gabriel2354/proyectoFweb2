import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { TablaPeliculasComponent } from './components/tabla-peliculas/tabla-peliculas.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'peliculas',
    component: PeliculasComponent
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'registro-usuarios',
    component: RegistroUsuariosComponent
  },
  {
    path:'tabla-peliculas',
    component: TablaPeliculasComponent
  },
  {
    path: 'tabla-usuarios',
    component: TablaUsuariosComponent
  },
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  }
  
];
