import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplejoService } from 'src/app/services/complejo.service';

@Component({
  selector: 'app-reservar-canchas',
  templateUrl: './reservar-canchas.component.html',
  styleUrls: ['./reservar-canchas.component.scss']
})
export class ReservarCanchasComponent {

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
          this.router.navigate(['/dashboard/canchas']);
        },
      });
    });
  }
  reservar() {
    this.router.navigate(['/dashboard/', this.id]);
  }
}
