import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Complex } from '../interfaces/complexes.interface';

@Injectable({
  providedIn: 'root',
})
export class ComplejoService {
  private apiURL = 'http://localhost:3000/api/';
  //private apiURL=`${environment.api}/api/v1`;   no se conecta en el vercel
  //private apiURL='http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getComplexes(): Observable<Complex[]> {
    return this.http.get<Complex[]>(`${this.apiURL}complexes`);
  }

  deleteComplex(id: string): Observable<Complex> {
    return this.http.delete<Complex>(`${this.apiURL}complexes/` + id);
  }

  saveComplex(complex: Complex): Observable<Complex> {
    return this.http.post<Complex>(`${this.apiURL}complexes`, complex);
  }

  editComplex(complex: Complex): Observable<Complex> {
    return this.http.put<Complex>(
      `${this.apiURL}complexes/${complex._id}`,
      complex
    );
  }

  getOneComplex(id: string): Observable<Complex> {
    return this.http.get(`${this.apiURL}complexes/` + id).pipe(
      map((response: any) => {
        const complex: Complex = {
          _id: response.data.id,
          name: response.data.name,
          address: response.data.address,
          phone: response.data.address,
          email: response.data.email,
          city: response.data.city,
        };
        return complex;
      })
    );
  }
}
