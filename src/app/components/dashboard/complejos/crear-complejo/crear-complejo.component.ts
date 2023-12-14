import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Complex } from 'src/app/interfaces/complexes.interface';
import { ComplejoService } from 'src/app/services/complejo.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-crear-complejo',
  templateUrl: './crear-complejo.component.html',
  styleUrls: ['./crear-complejo.component.scss'],
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
export class CrearComplejoComponent {
  ciudades: any = [];
  provincias: any = [];
  nombre = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  ciudad = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  constructor(
    private complejoService: ComplejoService,
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataService
      .getProvinces()
      .subscribe((result) => (this.provincias = result));
    this.dataService
      .getCities(this.provincia.value || '')
      .subscribe((result) => (this.ciudades = result));
  }

  getErrorMessage(): boolean {
    if (
      this.nombre.hasError('required') ||
      this.direccion.hasError('required') ||
      this.telefono.hasError('required') ||
      this.email.hasError('required') ||
      this.ciudad.hasError('required') ||
      this.provincia.hasError('required')
    ) {
      return true;
    }
    return false;
  }
  crear() {
    if (!this.getErrorMessage()) {
      const complex: Complex = {
        name: this.nombre.value || '',
        address: this.direccion.value || '',
        phone: this.telefono.value || '',
        email: this.email.value || '',
        city: this.ciudad.value || '',
      };
      this.complejoService.saveComplex(complex).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'El complejo fue creado con éxito.'
          );
          sessionStorage.setItem('tipo_mensaje', 'green-snackbar');
          this.router.navigate(['/dashboard/complejos']);
        },
        error: (e) => {
          if (
            e.error.message.includes('E11000 duplicate key error collection')
          ) {
            this._snackBar.open(
              'El complejo ingresado ya existe (nombre - ciudad).',
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

  actualizarSeleccion() {
    this.dataService
      .getCities(this.provincia.value || '')
      .subscribe((result) => {
        this.ciudades = result;
        this.ciudad.setValue('');
      });
  }
}
