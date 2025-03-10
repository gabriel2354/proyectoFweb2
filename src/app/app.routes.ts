import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { TablaPeliculasComponent } from './components/tabla-peliculas/tabla-peliculas.component';
import { authGuard } from './guardian/auth.guard';

import { AdministradorComponent } from './pages/administrador/administrador.component';
import { RegistroAdministradorComponent } from './components/registro-administrador/registro-administrador.component';
import { TablaAdministradorComponent } from './components/tabla-administrador/tabla-administrador.component';
import { FacturaComponent } from './components/factura/factura.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registro-usuarios', component: RegistroUsuariosComponent},
  { path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: 'factura', component: FacturaComponent},
  // Rutas restringidas solo para administradores
  { path: 'administrador', component: AdministradorComponent, canActivate: [authGuard] },
  {path:'registro-administrador', component:RegistroAdministradorComponent,canActivate:[authGuard]},
  {path:'tabla-administrador', component:TablaAdministradorComponent,canActivate:[authGuard]},
  { path: 'tabla-peliculas', component: TablaPeliculasComponent, canActivate: [authGuard] },
  { path: 'tabla-usuarios', component: TablaUsuariosComponent, canActivate: [authGuard] },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];
