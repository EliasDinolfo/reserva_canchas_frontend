import { Component, OnInit } from '@angular/core';
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
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';

import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss'],
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
export class ActualizarUsuarioComponent {
  id: string = '0';
  nombreAnterior = new FormControl('');
  apellidoAnterior = new FormControl('');
  nombreUsuarioAnterior = new FormControl('');
  dniAnterior = new FormControl('');
  telefonoAnterior = new FormControl('');
  emailAnterior = new FormControl('');
  rolAnterior = new FormControl('');
  contrasenaAnterior = new FormControl('');
  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  nombreUsuario = new FormControl('', [Validators.required]);
  dni = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  rol = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRouted: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}
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
  ngOnInit(): void {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.usuarioService.getOneUsuario(this.id).subscribe({
        next: (result) => {
          this.nombreUsuario.setValue(result.username);
          this.nombreUsuarioAnterior.setValue(result.username);

          this.contrasena.setValue(result.password);
          this.contrasenaAnterior.setValue(result.password);

          this.nombre.setValue(result.name);
          this.nombreAnterior.setValue(result.name);
          
          this.apellido.setValue(result.lastname);
          this.apellidoAnterior.setValue(result.lastname);

          this.dni.setValue(result.dni);
          this.dniAnterior.setValue(result.dni);

          this.telefono.setValue(result.phone_number);
          this.telefonoAnterior.setValue(result.phone_number);

          this.email.setValue(result.email);
          this.emailAnterior.setValue(result.email);

          this.rol.setValue(result.role);
          this.rolAnterior.setValue(result.role);
        },
        error: (error) => {
          sessionStorage.setItem(
            'mensaje',
            'El usuario solicitado no existe.'
          );
          sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
          this.router.navigate(['/dashboard/usuarios']);
        },
      });
    });
  }

  actualizar() {
    if (this.getErrorMessage().length === 0) {
      const usuario: Usuario = {
                                 _id: this.id,
                                 username: this.nombreUsuario.value || '',
                                 password: this.contrasena.value || '',
                                 name: this.nombre.value || '',
                                 lastname: this.apellido.value || '',
                                 dni: this.dni.value || '',
                                 phone_number: this.telefono.value || '',
                                 email: this.email.value || '',
                                 role: this.rol.value || '',
      };
      this.usuarioService.editUsuario(usuario).subscribe({
        next: (result) => {
          sessionStorage.setItem(
            'mensaje',
            'El usuario fue modificado con éxito.'
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
