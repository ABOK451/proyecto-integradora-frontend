import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private apiUrl = 'http://localhost:3000/api/sedes';

  constructor(private http: HttpClient) { }


  getAllSedes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSede(sede: Sede): Observable<Sede> {
    return this.http.post<Sede>(this.apiUrl, sede);
  }

  actualizarSede(id: string, sedeData: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, sedeData);
}

  eliminarSede(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
}
}
