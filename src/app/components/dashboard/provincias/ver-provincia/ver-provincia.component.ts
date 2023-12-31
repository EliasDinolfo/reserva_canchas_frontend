import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-provincia',
  templateUrl: './ver-provincia.component.html',
  styleUrls: ['./ver-provincia.component.scss'],
})
export class VerProvinciaComponent {
  id: string = '0';
  nombre: string = '';
  provinces: any;
  constructor(
    private dataService: DataService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) {}

  displayedColumns: string[] = ['name', 'postal_code'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.activatedRouted.params.subscribe((params) => {
      this.dataSource.filterPredicate = (data: any, filter: any): any =>
        data.name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !==
          -1 ||
        data.postal_code
          .trim()
          .toLowerCase()
          .indexOf(filter.trim().toLowerCase()) !== -1;
      this.id = params['id'];
      this.dataService.getOneProvince(this.id).subscribe({
        next: (result) => {
          this.nombre = result.name;
          this.dataService
            .getCities(this.id)
            .subscribe((result: any) => (this.dataSource.data = result.data));
        },
        error: (error) => {
          sessionStorage.setItem(
            'mensaje',
            'La provincia solicitada no existe.'
          );
          sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
          this.router.navigate(['/dashboard/provincias']);
        },
      });
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página:';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
