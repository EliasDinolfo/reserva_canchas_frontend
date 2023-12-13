import { Usuario } from '../interfaces/usuario';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /*
   //Estos datos son de prueba, luego hay que conectarlo con el backend y base de datos
   listUsuarios: Usuario[] = [
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'},
    {username: 'fgomez', name: 'Francisco', lastname: 'Gómez', dni: '41899298', phone_number: '3364352353', email: 'fran@mail.com', role: 'Administrador'},
    {username: 'edinolfo', name: 'Elias', lastname: 'Dinolfo', dni: '41123423', phone_number: '3414363325', email: 'elias@mail.com', role: 'Administrador'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'},
    {username: 'bpadin', name: 'Bruno', lastname: 'Padin', dni: '40123423', phone_number: '3414363257', email: 'bruno@mail.com', role: 'Operador'},
    {username: 'gramirez', name: 'Gabriel', lastname: 'Ramirez', dni: '40123423', phone_number: '3414344789', email: 'gab0@mail.com', role: 'Operador'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'},
    {username: 'ggomez', name: 'Gabriel', lastname: 'Gómez', dni: '39123423', phone_number: '3364234654', email: 'gabriel@mail.com', role: 'Operador'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Operador'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'},
    {username: 'pgonzalez', name: 'Pedro', lastname: 'Gonzalez', dni: '40123423', phone_number: '3414364287', email: 'pgonzalez@mail.com', role: 'Cliente'}
];

  constructor() { }


  getUsuario() {
    return this.listUsuarios.slice();
  }

  eliminarUsuario(index: number) {
    this.listUsuarios.splice(index, 1);
  }
  */


  private apiURL = 'http://localhost:3000/api/';
  //private apiURL=`${environment.api}/api/v1`;   no se conecta en el vercel
  //private apiURL='http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiURL}users`);
  }

  deleteUsuario(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiURL}users/` + id);
  }

  saveUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiURL}users`, usuario);
  }

  editUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiURL}users/${usuario._id}`,
      usuario
    );
  }

  getOneUsuario(id: string): Observable<Usuario> {
    return this.http.get(`${this.apiURL}users/` + id).pipe(
      map((response: any) => {
        const usuario: Usuario = response.data;
        return usuario;
      })
    );
  }
}
