import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplejoService } from 'src/app/services/complejo.service';

@Component({
  selector: 'app-complejos',
  templateUrl: './complejos.component.html',
  styleUrls: ['./complejos.component.scss'],
})
export class ComplejosComponent {
  cities: any;
  public mensaje = sessionStorage.getItem('mensaje');
  public tipo_mensaje = sessionStorage.getItem('tipo_mensaje');
  constructor(
    private complexService: ComplejoService,
    private _snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = [
    'name',
    'address',
    'phone',
    'email',
    'province',
    'city',
    'actions',
  ];
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
        -1 ||
      data.address.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
        -1 ||
      data.phone.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
        -1 ||
      data.email.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
        -1 ||
      (data.city.name !== undefined &&
        data.city.name
          .trim()
          .toLowerCase()
          .indexOf(filter.trim().toLowerCase()) !== -1) ||
      (data.city.province.name !== undefined &&
        data.city.province.name
          .trim()
          .toLowerCase()
          .indexOf(filter.trim().toLowerCase()) !== -1);

    this.complexService.getComplexes().subscribe((result: any) => {
      this.dataSource.data = result.data;
    });
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

  eliminacion(id: string) {
    if (confirm('¿Estás seguro que quieres eliminar el complejo?')) {
      this.complexService.deleteComplex(id).subscribe({
        next: (result2: any) => {
          this.mensaje = '';
          this.complexService.getComplexes().subscribe((result: any) => {
            this.dataSource.data = result.data;
            this.dataSource.connect().next(result.data);
            this.ngAfterViewInit();
            this._snackBar.open('El complejo fue eliminado con éxito.', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['green-snackbar'],
            });
          });
        },
        error: (e) => {
          this._snackBar.open(e.error.message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['red-snackbar'],
          });
        },
      });
    }
  }
}
