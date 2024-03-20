import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { ContratoService } from '../../services/contrato.service'; // Cambiado el servicio
import { Contrato } from '../../models/contrato';// Cambiado el modelo

@Component({
  selector: 'app-crud-contrato', // Cambiado el nombre del componente
  templateUrl: './crud-contrato.component.html', // Cambiado el nombre del archivo HTML
  styleUrls: ['./crud-contrato.component.css'] // Cambiado a styleUrls
})
export class CrudContratoComponent implements OnInit {
  contratos: Contrato[] = []; // Cambiado el tipo de objeto
  contrato: Contrato | any= {}; // Cambiado el tipo de objeto
  modoEdicion: boolean = false;
  tipoContratoBusqueda: string = ''; // Cambiado el nombre de la variable de búsqueda

  constructor(private contratoService: ContratoService) { } // Cambiado el nombre del servicio

  ngOnInit(): void {
    this.cargarContratos();
  }

  cargarContratos() {
    this.contratoService.getContrato().subscribe((contratos: Contrato[]) => { // Asegúrate de tipar correctamente los contratos recibidos
      this.contratos = contratos;
    });
  }

  guardarContrato() {
    if (this.modoEdicion) {
      const tipoContrato: string = this.contrato.TipoContrato.valueOf();
      this.contratoService.actualizarContrato(tipoContrato, this.contrato).subscribe(() => {
        this.resetForm();
        this.cargarContratos();
      });
    } else {
      this.contratoService.crearContrato(this.contrato).subscribe(() => {
        this.resetForm();
        this.cargarContratos();
      });
    }
  }

  agregarTurno() {
    if (!this.contrato.TurnosContrato) {
      this.contrato.TurnosContrato = [];
    }
    this.contrato.TurnosContrato.push({ inicio: '', fin: '' });
  }

  editarContrato(contrato: Contrato) {
    this.modoEdicion = true;
    this.contrato = { ...contrato }; // Copia de seguridad para no modificar el objeto original directamente
  }

  eliminarContrato(id: string) {
    this.contratoService.eliminarContrato(id).subscribe(() => { // Cambiado el método
      this.cargarContratos();
    });
  }

  resetForm() {
    this.contrato = {};
    this.modoEdicion = false;
  }

  buscarContrato(): void {
    if (this.tipoContratoBusqueda.trim() !== '') {
      this.contratoService.obtenerUnContrato(this.tipoContratoBusqueda).subscribe((data: any) => { // Cambiado el método y el nombre de la variable de búsqueda
        // Actualiza la lista de contratos con el resultado de la búsqueda
        this.contratos = [data];
      });
    } else {
      // Si no se ingresa ningún tipo de contrato, vuelve a cargar todos los contratos
      this.cargarContratos();
    }
  }  
}
