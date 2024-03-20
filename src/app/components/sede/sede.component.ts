import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../services/sede.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sede } from '../../models/sede';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedesComponent implements OnInit {
  sedes: Sede[] | undefined;
  nombre: string = '';
  ubicacion: string = '';


  sede:Sede = {

    nombre: '',
    ubicacion: ''
   }



  constructor(private sedeService: SedeService) { }

  ngOnInit(): void {
    this.getAllSedes();
  }

  getAllSedes(): void {
    this.sedeService.getAllSedes()
      .subscribe(sedes => this.sedes = sedes);
  }

  createSede(): void {
    if (!this.nombre.trim() || !this.ubicacion.trim()) {
      return; // Si alguno de los campos está vacío, no hacemos nada
    }
    const nuevaSede: Sede = { nombre: this.nombre, ubicacion: this.ubicacion };
    this.sedeService.createSede(nuevaSede)
      .subscribe(() => {
        this.getAllSedes(); // Volvemos a cargar las sedes después de agregar una nueva
        this.nombre = ''; // Limpiamos los campos del formulario después de agregar
        this.ubicacion = '';
      });
  }

  onSubmit(): void {
    this.createSede(); // Método llamado cuando se envía el formulario
  }
}
