import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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
}
