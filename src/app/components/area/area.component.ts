import { Component, HostBinding } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']


})
export class AreaComponent {
  @HostBinding('class') classes='row';
  area: Area[] = [];
  nuevaArea: Area = { NombreArea: '', Descripcion: '' };
  mostrarNuevoArea = false;
  mostrarTodasLasConsultas = false;
  consultasIniciales = 5;

  constructor(private areaService : AreaService, private router:Router,
    private activateRoute:ActivatedRoute){
  }

  ngOnInit(){
    console.log()
    this.getArea();


  }

  getArea(){
    this.areaService.getArea().subscribe(
      resp => {
        console.log('Asignacion de los datos:', this.area);
        this.area =resp;

      },
      err => console.error(err)
    )
  }

  mostrarFormulario() {
    this.mostrarNuevoArea = !this.mostrarNuevoArea; // Cambiar el estado de mostrarNuevoArea
  }

  crearNuevaArea() {
    this.areaService.crearArea(this.nuevaArea).subscribe(
      resp => {
        console.log('Área creada:', resp);
        this.getArea();
        this.nuevaArea = { NombreArea: '', Descripcion: '' };
        this.mostrarNuevoArea = false;
      },
      err => console.error(err)
    );
  }


  editarArea(area: Area) {
    area.editando = true;
  }

  guardarEdicion(area: Area) {
    area.editando = false; // Establece la bandera editando a false para ocultar el formulario de edición
    const areaData = { Descripcion: area.Descripcion };
    this.areaService.actualizarArea(area.NombreArea, areaData).subscribe(
      resp => {
        console.log('Área actualizada exitosamente:', resp);
        // Actualizar el área en el array local o recargar la lista de áreas
        this.getArea();
      },
      err => console.error('Error al actualizar el área:', err)
    );
  }


  eliminarArea(nombreArea: string) {
    this.areaService.eliminarArea(nombreArea).subscribe(
      resp => {
        console.log('Área eliminada exitosamente:', resp);
        // Eliminar el área del array local o recargar la lista de áreas
        this.getArea();
      },
      err => console.error('Error al eliminar el área:', err)
    );
  }

  }

