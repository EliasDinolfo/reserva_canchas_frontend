import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.scss'],
})
export class CiudadesComponent {
  cities: any;
  public mensaje = sessionStorage.getItem('mensaje');
  constructor(private cityService: CiudadService) {}

  displayedColumns: string[] = ['name', 'postal_code', 'province', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: any): any =>
      data.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
        -1 ||
      data.postal_code
        .trim()
        .toLowerCase()
        .indexOf(filter.trim().toLowerCase()) !== -1 ||
      (data.province.name !== undefined &&
        data.province.name
          .trim()
          .toLowerCase()
          .indexOf(filter.trim().toLowerCase()) !== -1);

    this.cityService
      .getCities()
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
      this.cityService.deleteCity(id).subscribe({
        next: (result2: any) => {
          this.mensaje = '';
          this.cityService.getCities().subscribe((result: any) => {
            this.dataSource.data = result.data;
            this.dataSource.connect().next(result.data);
            this.ngAfterViewInit();
          });
        },
        error: (e) => {
          this.mensaje = e.error.message;
        },
      });
    }
  }
}
