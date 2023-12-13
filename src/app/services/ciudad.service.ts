import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../intefaces/cities.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private apiURL = 'http://localhost:3000/api/';
  //private apiURL=`${environment.api}/api/v1`;   no se conecta en el vercel
  //private apiURL='http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiURL}cities`);
  }

  deleteCity(id: string): Observable<City> {
    return this.http.delete<City>(`${this.apiURL}cities/` + id);
  }

  saveCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.apiURL}cities`, city);
  }

  editCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiURL}cities/${city._id}`, city);
  }

  getOneCity(id: string): Observable<City> {
    return this.http.get(`${this.apiURL}cities/` + id).pipe(
      map((response: any) => {
        const city: City = {
          _id: response.data.id,
          name: response.data.name,
          postal_code: response.data.postal_code,
          province: response.data.province.id,
        };
        return city;
      })
    );
  }
}
