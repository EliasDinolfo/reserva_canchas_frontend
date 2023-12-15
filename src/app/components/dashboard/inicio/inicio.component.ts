import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ComplejoService } from 'src/app/services/complejo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  reservado: any;
  provinces: any;
  cities: any;
  provinceSeleccionado: string = '0';
  citySeleccionado: string = '0';
  complexes: any;
  constructor(private dataService: DataService, private complejoService: ComplejoService, private activatedRouted: ActivatedRoute,) {}

  ngOnInit() {
    this.dataService
      .getProvinces()
      .subscribe((result) => (this.provinces = result));
    this.dataService
      .getCities(this.provinceSeleccionado)
      .subscribe((result) => (this.cities = result));

    this.complejoService
      .getComplexes()
      .subscribe((result) => (this.complexes = result));

      this.activatedRouted.params.subscribe((params) => {
        this.reservado = params['id'];
      });
  }
  actualizar() {
    this.dataService
      .getCities(this.provinceSeleccionado)
      .subscribe((result) => (this.cities = result));
  }
  actualizarComplejos() {
    this.dataService
      .getComplexes(this.citySeleccionado)
      .subscribe((result) => (this.complexes = result));
  }
  cancelar() {
    this.reservado='';
  }
}
