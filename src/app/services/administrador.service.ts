import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private API_ADMINISTRADORES = 'http://localhost:3000/administrador'; 

  constructor(private http:HttpClient) { }
  // Método POST: Crear un nuevo administrador
postAdministrador(administrador: any): Observable<any> {
  return this.http.post(this.API_ADMINISTRADORES, administrador);
}

// MOSTRAR ADMINISTRADORES
getAdministradores(): Observable<any> {
  return this.http.get(this.API_ADMINISTRADORES);
}

// MOSTRAR ADMINISTRADOR POR ID
getAdministradorById(id: any): Observable<any> {
  return this.http.get(`${this.API_ADMINISTRADORES}/${id}`);
}

// ELIMINAR ADMINISTRADOR
deleteAdministrador(id: number): Observable<any> {
  return this.http.delete(`${this.API_ADMINISTRADORES}/${id}`);
}

// ACTUALIZAR ADMINISTRADOR
putAdministrador(administrador: any): Observable<any> {
  return this.http.put(`${this.API_ADMINISTRADORES}/${administrador.id}`, administrador);
}


}
