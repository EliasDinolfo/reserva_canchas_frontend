import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  provinces: any;
  cities: any;
  provinceSeleccionado: string = '0';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getProvinces()
      .subscribe((result) => (this.provinces = result));
    this.dataService
      .getCities(this.provinceSeleccionado)
      .subscribe((result) => (this.cities = result));
  }
  actualizar() {
    this.dataService
      .getCities(this.provinceSeleccionado)
      .subscribe((result) => (this.cities = result));
  }
}
