import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { City } from 'src/app/intefaces/cities.interface';
import { CiudadService } from 'src/app/services/ciudad.service';
import { DataService } from 'src/app/services/data.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    NgFor,
  ],
})
export class CrearCiudadComponent {
  provincias: any = [];
  nombre = new FormControl('', [Validators.required]);
  codigo_postal = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  constructor(
    private ciudadService: CiudadService,
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataService
      .getProvinces()
      .subscribe((result) => (this.provincias = result));
  }

  getErrorMessage(): boolean {
    if (
      this.codigo_postal.hasError('required') ||
      this.nombre.hasError('required') ||
      this.provincia.hasError('required')
    ) {
      return true;
    }
    return false;
  }
  crear() {
    if (!this.getErrorMessage()) {
      const city: City = {
        name: this.nombre.value || '',
        postal_code: this.codigo_postal.value || '',
        province: this.provincia.value || '',
      };
      this.ciudadService.saveCity(city).subscribe({
        next: (result) => {
          sessionStorage.setItem('mensaje', 'La ciudad fue creada con éxito.');
          sessionStorage.setItem('tipo_mensaje', 'green-snackbar');
          this.router.navigate(['/dashboard/ciudades']);
        },
        error: (e) => {
          if (
            e.error.message.includes('E11000 duplicate key error collection')
          ) {
            this._snackBar.open(
              'La ciudad ingresada ya existe (nombre - provincia).',
              '',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['red-snackbar'],
              }
            );
          }
        },
      });
    }
  }
}
