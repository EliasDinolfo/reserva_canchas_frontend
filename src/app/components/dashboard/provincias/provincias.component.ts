import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss'],
})
export class ProvinciasComponent {
  provinces: any;
  public mensaje = sessionStorage.getItem('mensaje');
  public tipo_mensaje = sessionStorage.getItem('tipo_mensaje');
  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = ['name', 'actions'];
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
    this.dataService
      .getProvinces()
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

  eliminacion(id: string) {
    if (confirm('¿Estás seguro que quieres eliminar la provincia?')) {
      this.dataService.deleteProvince(id).subscribe({
        next: (result2: any) => {
          this.mensaje = '';
          this.dataService.getProvinces().subscribe((result: any) => {
            this.dataSource.data = result.data;
            this.dataSource.connect().next(result.data);
            this.ngAfterViewInit();
            this._snackBar.open('La provincia fue eliminada con éxito.', '', {
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
