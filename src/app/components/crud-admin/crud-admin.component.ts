import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';
import { CorreoService } from '../../services/correo.service';
import { Correo } from '../../models/correo';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-crud-admin',
  templateUrl: './crud-admin.component.html',
  styleUrls: ['./crud-admin.component.css']
})
export class CrudAdminComponent implements OnInit {
  administradores: Administrador[] = [];
  administrador: Administrador | any = {};
  modoEdicion: boolean = false;
  nombreBusqueda: string = '';
  correoAdmin: Correo | any = {};

  constructor(
    private administradorService: AdministradorService,
    private correoService: CorreoService        
  ) { }

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores() {
    this.administradorService.getAdministrador().subscribe(admins => {
      this.administradores = admins;
    });
  }

  guardarAdministrador() {
    if (this.modoEdicion) {
      const nombre: string = this.administrador.NombreAdmin.valueOf();
      this.administradorService.actualizarAdministrador(nombre, this.administrador).subscribe(() => {
        this.resetForm();
        this.cargarAdministradores();
        this.enviarNotificacion('Datos actualizados', 'Se informa que la informacion de su cuenta como ADMINISTRADOR de GanttFlow ha sido modificada', this.administrador.correoAdmin);
      });
    } else {
      this.administradorService.crearAdministrador(this.administrador).subscribe(() => {
        this.resetForm();
        this.cargarAdministradores();
        this.enviarNotificacion('Cuenta como Administrador creada', 'La cuenta para Gantt Flow ha sido creada exitosamente.', this.administrador.correoAdmin);
      });
    }
  }

  editarAdministrador(admin: Administrador) {
    this.modoEdicion = true;
    this.administrador = { ...admin };
  }

  eliminarAdministrador(id: string) {
    this.administradorService.eliminarAdministrador(id).subscribe(() => {
      this.cargarAdministradores();
      this.enviarNotificacion('Administrador eliminado', 'Su cuenta de administrador ha sido eliminada de Gantt Flow.', this.administrador.correoAdmin);
    });
  }

  resetForm() {
    this.administrador = {};
    this.modoEdicion = false;
  }

  buscarAdministrador(): void {
    if (this.nombreBusqueda.trim() !== '') {
      this.administradorService.obtenerUnAdministrador(this.nombreBusqueda).subscribe((data: any) => {
        this.administradores = [data];
      });
    } else {
      this.cargarAdministradores();
    }
  }

  enviarNotificacion(asunto: string, mensaje: string, correo: string): void {

    if (correo && correo.trim() !== '') {
      this.correoAdmin = {
        correo: correo,
        asunto: asunto,
        mensaje: mensaje
      };
      this.correoService.envioCorreo(this.correoAdmin).pipe(
        catchError(error => {
          console.error('Error al enviar notificación por correo electrónico:', error);
          return of(null); 
        })
      ).subscribe(respuesta => {
        if (respuesta) {
          console.log('Notificación por correo electrónico enviada correctamente:', respuesta);
        } else {
          console.warn('La notificación por correo electrónico no pudo ser enviada.');
        }
      });
    } else {
      console.warn('La dirección de correo electrónico del destinatario no está definida.');
    }
  }
  
  
}
