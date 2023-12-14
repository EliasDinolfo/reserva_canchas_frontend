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
import { ActivatedRoute } from '@angular/router';
import { CiudadService } from 'src/app/services/ciudad.service';
import { City } from 'src/app/intefaces/cities.interface';
import { DataService } from 'src/app/services/data.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-ciudad',
  templateUrl: './actualizar-ciudad.component.html',
  styleUrls: ['./actualizar-ciudad.component.scss'],
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
export class ActualizarCiudadComponent {
  provincias: any = [];
  id: string = '0';
  nombreAnterior = new FormControl('');
  nombre = new FormControl('', [Validators.required]);
  codigoPostal = new FormControl('', [Validators.required]);
  codigoPostalAnterior = new FormControl('');
  provincia = new FormControl('', [Validators.required]);
  provinciaAnterior = new FormControl('');
  constructor(
    private ciudadService: CiudadService,
    private dataService: DataService,
    private router: Router,
    private activatedRouted: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
  getErrorMessage(): boolean {
    if (
      this.nombre.hasError('required') ||
      this.codigoPostal.hasError('required') ||
      this.provincia.hasError('required')
    ) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    this.activatedRouted.params.subscribe((params) => {
      this.dataService.getProvinces().subscribe((result) => {
        this.provincias = result;
        this.id = params['id'];
        this.ciudadService.getOneCity(this.id).subscribe({
          next: (result) => {
            this.nombre.setValue(result.name);
            this.nombreAnterior.setValue(result.name);
            this.codigoPostal.setValue(result.postal_code);
            this.codigoPostalAnterior.setValue(result.postal_code);
            this.provincia.setValue(result.province);
            this.provinciaAnterior.setValue(result.province);
          },
          error: (error) => {
            sessionStorage.setItem(
              'mensaje',
              'La ciudad solicitada no existe.'
            );
            sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
            this.router.navigate(['/dashboard/ciudades']);
          },
        });
      });
    });
  }

  actualizar() {
    if (!this.getErrorMessage()) {
      const city: City = {
        _id: this.id,
        name: this.nombre.value || '',
        postal_code: this.codigoPostal.value || '',
        province: this.provincia.value || '',
      };
      this.ciudadService.editCity(city).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'La ciudad fue modificada con éxito.'
          );
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
