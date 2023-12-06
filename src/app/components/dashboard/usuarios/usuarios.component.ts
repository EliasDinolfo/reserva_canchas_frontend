import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
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

  displayedColumns: string[] = ['username', 'name', 'lastname', 'dni', 'phone_number', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource(this.listUsuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
