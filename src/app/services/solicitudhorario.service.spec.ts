import {SolicitudHorarioService } from './solicitudhorario.service';
import { TestBed } from '@angular/core/testing';


describe('SolicitudHorarioService ', () => {
  let service: SolicitudHorarioService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudHorarioService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
