import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class SolicitudHorarioService{
    private URL = 'http://localhost:3000/api'

    constructor(private http: HttpClient) {}

    getSolicitudHorario () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearSolicitudHorario(solicitudHorarioData: any): Observable<any>{
        return this.http.post(this.URL, solicitudHorarioData);
    }

    actulializarSolicitudHorario(id: string, solicitudHorarioData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, solicitudHorarioData);
    }

    eliminarSolicitudHorario(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }
}
