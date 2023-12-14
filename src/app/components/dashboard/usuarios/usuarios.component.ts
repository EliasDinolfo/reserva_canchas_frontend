import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: any;
  public mensaje = sessionStorage.getItem('mensaje');
  public tipo_mensaje = sessionStorage.getItem('tipo_mensaje');
  constructor(private usuarioService: UsuarioService, private _snackBar: MatSnackBar) {}

  displayedColumns: string[] = ['username', 'name', 'lastname', 'dni', 'phone_number', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    if (this.mensaje !== null) {
      this._snackBar.open(this.mensaje, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: [this.tipo_mensaje || ''],
      });
      this.mensaje = null;
      this.tipo_mensaje = null;
      sessionStorage.removeItem('mensaje');
      sessionStorage.removeItem('tipo_mensaje');
    }

    this.dataSource.filterPredicate = (data: any, filter: any): any =>
      data.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
      -1;
    this.usuarioService
      .getUsuarios()
      .subscribe((result: any) => (this.dataSource.data = result.data));
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página:';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    sessionStorage.clear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro que quieres eliminar al usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe((result2: any) => {
        this.usuarioService.getUsuarios().subscribe((result: any) => {
          this.dataSource.data = result.data;
          this.dataSource.connect().next(result.data);
          this.ngAfterViewInit();
        });
      });
    }

    this._snackBar.open('El usuario fue eliminado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar'],
    })
  }
}
