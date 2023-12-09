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
import { DataService } from 'src/app/services/data.service';
import { Province } from 'src/app/intefaces/provinces.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-provincia',
  templateUrl: './actualizar-provincia.component.html',
  styleUrls: ['./actualizar-provincia.component.scss'],
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
export class ActualizarProvinciaComponent implements OnInit {
  id: string = '0';
  error: string = '';
  nombreAnterior = new FormControl('');
  nombre = new FormControl('', [Validators.required]);
  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRouted: ActivatedRoute
  ) {}
  getErrorMessage() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor.';
    }

    return '';
  }
  ngOnInit(): void {
    this.activatedRouted.params.subscribe((params) => {
      this.id = params['id'];
      this.dataService.getOneProvince(this.id).subscribe({
        next: (result) => {
          this.nombre.setValue(result.name);
          this.nombreAnterior.setValue(result.name);
        },
        error: (error) => {
          this.router.navigate(['/dashboard/provincias']);
          sessionStorage.setItem(
            'mensaje',
            'La provincia solicitada no existe'
          );
        },
      });
    });
  }

  actualizar() {
    this.error = '';
    if (this.getErrorMessage().length === 0) {
      const province: Province = {
        _id: this.id,
        name: this.nombre.value || '',
      };
      this.dataService.editProvince(province).subscribe({
        next: (result) => {
          this.router.navigate(['/dashboard/provincias']);
        },
        error: (e) => {
          if (
            e.error.message.includes('E11000 duplicate key error collection')
          ) {
            this.error = 'La provincia ingresada ya existe.';
          }
        },
      });
    }
  }
}
