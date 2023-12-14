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
import { DataService } from 'src/app/services/data.service';
import { Province } from 'src/app/intefaces/provinces.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-provincia',
  templateUrl: './crear-provincia.component.html',
  styleUrls: ['./crear-provincia.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class CrearProvinciaComponent {
  nombre = new FormControl('', [Validators.required]);
  constructor(
    private dataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  getErrorMessage() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor.';
    }

    return '';
  }
  crear() {
    if (this.getErrorMessage().length === 0) {
      const province: Province = { name: this.nombre.value || '' };
      this.dataService.saveProvince(province).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'La provincia fue creada con éxito.'
          );
          sessionStorage.setItem('tipo_mensaje', 'green-snackbar');
          this.router.navigate(['/dashboard/provincias']);
        },
        error: (e) => {
          if (
            e.error.message.includes('E11000 duplicate key error collection')
          ) {
            this._snackBar.open(
              'La provincia ingresada ya existe (nombre).',
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
