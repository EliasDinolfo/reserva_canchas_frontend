import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Province } from 'src/app/intefaces/provinces.interface';
import { CiudadService } from 'src/app/services/ciudad.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-ciudad',
  templateUrl: './ver-ciudad.component.html',
  styleUrls: ['./ver-ciudad.component.scss'],
})
export class VerCiudadComponent {
  id: string = '0';
  nombre: string = '';
  codigo_postal: string = '';
  provincia: Province = { _id: '', name: '' };
  constructor(
    private ciudadService: CiudadService,
    private dataService: DataService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.ciudadService.getOneCity(this.id).subscribe({
        next: (result) => {
          this.nombre = result.name;
          (this.codigo_postal = result.postal_code),
            (this.provincia._id = result.province);
          this.dataService
            .getOneProvince(this.provincia._id)
            .subscribe((result) => (this.provincia.name = result.name));
        },
        error: (error) => {
          sessionStorage.setItem('mensaje', 'La ciudad solicitada no existe.');
          sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
          this.router.navigate(['/dashboard/provincias']);
        },
      });
    });
  }
}
