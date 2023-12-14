import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplejoService } from 'src/app/services/complejo.service';

@Component({
  selector: 'app-ver-complejo',
  templateUrl: './ver-complejo.component.html',
  styleUrls: ['./ver-complejo.component.scss'],
})
export class VerComplejoComponent {
  id: string = '0';
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  provincia: string = '';
  ciudad: string = '';
  constructor(
    private complejoService: ComplejoService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.complejoService.getOneComplex(this.id).subscribe({
        next: (result: any) => {
          this.nombre = result.name;
          (this.direccion = result.address),
            (this.telefono = result.phone),
            (this.email = result.email),
            (this.provincia = result.city.province.name);
          this.ciudad = result.city.name;
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
}
