import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../services/data.service';
import { Province } from 'src/app/intefaces/provinces.interface.js';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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
    console.log('oa');
    this.dataService
      .getCities(this.provinceSeleccionado)
      .subscribe((result) => (this.cities = result));
  }
}
