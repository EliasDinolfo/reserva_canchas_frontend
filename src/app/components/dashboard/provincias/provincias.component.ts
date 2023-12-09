import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.scss'],
})
export class ProvinciasComponent {
  provinces: any;
  public mensaje = sessionStorage.getItem('mensaje');
  constructor(private dataService: DataService) {}

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
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
      this.dataService.deleteProvince(id).subscribe((result2: any) => {
        this.dataService.getProvinces().subscribe((result: any) => {
          this.dataSource.data = result.data;
          this.dataSource.connect().next(result.data);
          this.ngAfterViewInit();
        });
      });
    }
  }
}
