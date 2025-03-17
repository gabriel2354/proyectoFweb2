import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';

import { TablaPeliculasComponent } from './components/tabla-peliculas/tabla-peliculas.component';
import { authGuard } from './guardian/auth.guard';

import { AdministradorComponent } from './pages/administrador/administrador.component';

import { FacturaComponent } from './components/factura/factura.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { ClientesRegistroComponent } from './components/clientes-registro/clientes-registro.component';
import { TablaClientesComponent } from './components/tabla-clientes/tabla-clientes.component';

import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'clientes-registro', component: ClientesRegistroComponent},
  { path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: 'factura', component: FacturaComponent},
  // Rutas restringidas solo para administradores
  { path: 'administrador', component: AdministradorComponent },

  {path:'tabla-usuarios', component:TablaUsuariosComponent},
  { path: 'tabla-peliculas', component: TablaPeliculasComponent },
  { path: 'tabla-clientes', component: TablaClientesComponent},
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];
