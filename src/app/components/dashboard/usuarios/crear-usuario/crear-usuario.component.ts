import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule
  ],
})
export class CrearUsuarioComponent {

  error: string = '';
  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  nombreUsuario = new FormControl('', [Validators.required]);
  dni = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  rol = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  
  constructor(private usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar) {}
  getErrorMessage() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.apellido.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.nombreUsuario.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.dni.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.telefono.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.rol.hasError('required')) {
      return 'Debes ingresar un valor.';
    }
    if (this.contrasena.hasError('required')) {
      return 'Debes ingresar un valor.';
    }

    return '';
  }
  crear() {
    //this.error = '';
    if (this.getErrorMessage().length === 0) {
      const usuario: Usuario = { username: this.nombreUsuario.value || '',
                                 password: this.contrasena.value || '',
                                 name: this.nombre.value || '',
                                 lastname: this.apellido.value || '',
                                 dni: this.dni.value || '',
                                 phone_number: this.telefono.value || '',
                                 email: this.email.value || '',
                                 role: this.rol.value || '',
                                };
      this.usuarioService.saveUsuario(usuario).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'El usuario fue creado con éxito.'
          );
          sessionStorage.setItem('tipo_mensaje', 'green-snackbar');
          this.router.navigate(['/dashboard/usuarios']);
        },
        error: (e) => {
          if (
            e.error.message.includes('E11000 duplicate key error collection')
          ) {
            this._snackBar.open(
              'El usuario ingresado ya existe (nombre).',
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
