import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.scss'],
})
export class VerUsuarioComponent {
  id: string = '0';
  nombreUsuario: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  telefono: string = '';
  email: string = '';
  rol: string = '';
  constructor(
    private usuarioService: UsuarioService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.usuarioService.getOneUsuario(this.id).subscribe({
        next: (result) => {
          this.nombreUsuario = result.username;
          this.contrasena = result.password;
          this.nombre = result.name;
          this.apellido = result.lastname;
          this.dni = result.dni;
          this.telefono = result.phone_number;
          this.email = result.email;
          this.rol = result.role;
        },
        error: (error) => {
          sessionStorage.setItem('mensaje', 'El usuario solicitado no existe.');
          sessionStorage.setItem('tipo_mensaje', 'red-snackbar');
          this.router.navigate(['/dashboard/usuarios']);
        },
      });
    });
  }
}
