import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Vacacioneservice{
    private URL = 'http://localhost:3000/api'

    constructor(private http: HttpClient) {}

    getVacaciones () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearVacaciones(vacacionesData: any): Observable<any>{
        return this.http.post(this.URL, vacacionesData);
    }

    actulializarVacaciones(id: string, vacacionesData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, vacacionesData);
    }

    eliminarTurno(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }
}
