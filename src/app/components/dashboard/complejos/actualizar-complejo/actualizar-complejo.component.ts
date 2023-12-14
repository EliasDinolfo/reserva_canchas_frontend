import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Complex } from 'src/app/interfaces/complexes.interface';
import { ComplejoService } from 'src/app/services/complejo.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actualizar-complejo',
  templateUrl: './actualizar-complejo.component.html',
  styleUrls: ['./actualizar-complejo.component.scss'],
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
export class ActualizarComplejoComponent {
  provincias: any = [];
  ciudades: any = [];
  id: string = '0';
  nombreAnterior = new FormControl('');
  nombre = new FormControl('', [Validators.required]);
  direccionAnterior = new FormControl('');
  direccion = new FormControl('', [Validators.required]);
  telefonoAnterior = new FormControl('');
  telefono = new FormControl('', [Validators.required]);
  emailAnterior = new FormControl('');
  email = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  provinciaAnterior = new FormControl('');
  ciudad = new FormControl('', [Validators.required]);
  ciudadAnterior = new FormControl('');
  constructor(
    private dataService: DataService,
    private complejoService: ComplejoService,
    private router: Router,
    private activatedRouted: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
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
  ngOnInit(): void {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.complejoService.getOneComplex(this.id).subscribe({
        next: (result: any) => {
          this.nombre.setValue(result.name);
          this.nombreAnterior.setValue(result.name);
          this.direccion.setValue(result.address);
          this.direccionAnterior.setValue(result.address);
          this.telefono.setValue(result.phone);
          this.telefonoAnterior.setValue(result.phone);
          this.email.setValue(result.email);
          this.emailAnterior.setValue(result.email);
          this.ciudad.setValue(result.city.id);
          this.ciudadAnterior.setValue(result.city.id);
          this.provincia.setValue(result.city.province.id);
          this.provinciaAnterior.setValue(result.city.province.id);
          this.dataService
            .getProvinces()
            .subscribe((result) => (this.provincias = result));
          this.dataService
            .getCities(this.provincia.value || '')
            .subscribe((result) => (this.ciudades = result));
        },
        error: (error) => {
          sessionStorage.setItem(
            'mensaje',
            'El complejo solicitado no existe.'
          );
          sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
          this.router.navigate(['/dashboard/complejos']);
        },
      });
    });
  }

  actualizar() {
    if (!this.getErrorMessage()) {
      const complex: Complex = {
        _id: this.id,
        name: this.nombre.value || '',
        address: this.direccion.value || '',
        phone: this.telefono.value || '',
        email: this.email.value || '',
        city: this.ciudad.value || '',
      };
      this.complejoService.editComplex(complex).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'El complejo fue modificado con éxito.'
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
