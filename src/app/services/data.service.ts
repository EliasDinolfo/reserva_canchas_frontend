import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../intefaces/provinces.interface.js';
import { City } from '../intefaces/cities.interface.js';
import { map } from 'rxjs/operators';
import { Complex } from '../interfaces/complexes.interface.js';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'http://localhost:3000/api/';
  //private apiURL=`${environment.api}/api/v1`;   no se conecta en el vercel
  //private apiURL='http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.apiURL}provinces`);
  }

  deleteProvince(id: string): Observable<Province> {
    return this.http.delete<Province>(`${this.apiURL}provinces/` + id);
  }

  saveProvince(province: Province): Observable<Province> {
    return this.http.post<Province>(`${this.apiURL}provinces`, province);
  }

  editProvince(province: Province): Observable<Province> {
    return this.http.put<Province>(
      `${this.apiURL}provinces/${province._id}`,
      province
    );
  }

  getOneProvince(id: string): Observable<Province> {
    return this.http.get(`${this.apiURL}provinces/` + id).pipe(
      map((response: any) => {
        const province: Province = response.data;
        return province;
      })
    );
  }

  getCities(id: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiURL}cities/province/` + id);
  }

  getComplexesByCity(id: string): Observable<Complex[]> {
    return this.http.get<Complex[]>(`${this.apiURL}complexes/city/` + id);
  }
}
