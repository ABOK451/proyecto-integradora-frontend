import { Contrato } from './../../models/contrato';
// register-employe.component.ts

import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { AdministradorService } from '../../services/administrador.service';
import { formatDate } from '@angular/common'; // Importa la función formatDate
import { ContratoService } from '../../services/contrato.service';
import { AreaService } from '../../services/area.service';
import { SedeService } from '../../services/sede.service';


@Component({
  selector: 'app-register-employe',
  templateUrl: './register-employe.component.html',
  styleUrls: ['./register-employe.component.css'],
})
export class RegisterEmployeComponent implements OnInit {

  empleados: any[] = [];
  administradores: any[] = [];
  searchKeyword: string = '';

  empleado: Empleado = {
    Nombre: '',
    AppE: '',
    ApmE: '',
    FechaNac: new Date(),
    Correo: '',
    Region: '',
    AreaTrabajo: '',
    Departamento:'',
    Contrato: '',
    TurnoActual: {
      HoraInicial: new Date(),
      HoraFinal: new Date(),
    },
    HorarioTraining: {
      Fecha: new Date(),
      HoraInicial: new Date(),
      HoraFinal: new Date(),
    },
    NombreAdmin: '',
    FechaDeIngreso: new Date()
  };

  edit: boolean= false;

  isEditRoute: boolean = false;
  areas:any[] = [];
  departamentos: any[] = [];
  contratos: any[] = [];
  sedes: any[] = [];




  constructor(
    private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService,
    private administradorService: AdministradorService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private contratoService: ContratoService,
    private areaService: AreaService,
    private sedeService: SedeService
  ) {}

  submitForm() {
    // Verificar si todas las propiedades requeridas están llenas
    if (
      this.empleado.Nombre &&
      this.empleado.AppE &&
      this.empleado.ApmE &&
      this.empleado.FechaNac &&
      this.empleado.Correo &&
      this.empleado.Region &&
      this.empleado.AreaTrabajo &&
      this.empleado.Departamento &&
      this.empleado.Contrato &&
      this.empleado.TurnoActual.HoraInicial &&
      this.empleado.TurnoActual.HoraFinal &&
      this.empleado.HorarioTraining.Fecha &&
      this.empleado.HorarioTraining.HoraInicial &&
      this.empleado.HorarioTraining.HoraFinal
    ) {
      // Convertir las fechas y horas a objetos Date
      this.empleado.FechaNac = new Date(this.empleado.FechaNac);
      this.empleado.TurnoActual.HoraInicial = new Date(this.empleado.TurnoActual.HoraInicial);
      this.empleado.TurnoActual.HoraFinal = new Date(this.empleado.TurnoActual.HoraFinal);
      this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);
      this.empleado.HorarioTraining.HoraInicial = new Date(this.empleado.HorarioTraining.HoraInicial);
      this.empleado.HorarioTraining.HoraFinal = new Date(this.empleado.HorarioTraining.HoraFinal);

      // Imprimir el objeto empleado en la consola para verificar
      console.log('Form submitted with:', this.empleado);
      window.location.reload();
      // Llamar al servicio para crear el empleado
      this.empleadoService.crearEmpleado(this.empleado).subscribe(
        (response) => {
          console.log('Empleado saved successfully:', response);
        },
        (error) => {
          console.error('Error saving empleado:', error);
        }
      );
    } else {
      // Si alguna propiedad requerida está vacía, mostrar un mensaje de error o manejarlo según tus necesidades
      console.error('Error: Algunas propiedades requeridas están vacías.');
    }
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  private formatTime(time: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  }


  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (data: any) => {
        this.empleados = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  search() {
    if (this.searchKeyword.trim() !== '') {
      this.empleados = this.empleados.filter(empleado =>
        Object.values(empleado).some(value =>
          String(value).toLowerCase().includes(this.searchKeyword.toLowerCase())
        )
      );
    } else {
      this.getEmpleados();
    }
  }

  updateEmpleado(empleado: Empleado) {
    console.log(`Actualizando empleado: ${empleado.Nombre}`);

    // Convertir el correo a un string primitivo
    const correoString: string = empleado.Correo.valueOf();
    this.empleado.FechaNac = new Date(this.empleado.FechaNac);
      this.empleado.TurnoActual.HoraInicial = new Date(this.empleado.TurnoActual.HoraInicial);
      this.empleado.TurnoActual.HoraFinal = new Date(this.empleado.TurnoActual.HoraFinal);
      this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);
      this.empleado.HorarioTraining.HoraInicial = new Date(this.empleado.HorarioTraining.HoraInicial);
      this.empleado.HorarioTraining.HoraFinal = new Date(this.empleado.HorarioTraining.HoraFinal);
    this.empleadoService.actualizarEmpleado(correoString, empleado).subscribe(
      (response) => {
        console.log('Empleado actualizado exitosamente:', response);
        this.router.navigate(['/rg_emp/edit/', empleado.Correo]);

        // Actualizar la lista de empleados después de la actualización
        this.getEmpleados();
      },
      (error) => {
        console.error('Error al actualizar empleado:', error);
      }
    );
  }


  deleteEmpleado(empleado: any) {
    console.log(`Eliminar empleado: ${empleado.Nombre}`);

    // Aquí debes llamar al método correspondiente en tu servicio para eliminar el empleado por correo
    this.empleadoService.eliminarEmpleado(empleado.Correo).subscribe(
      (response) => {
        console.log('Empleado eliminado exitosamente:', response);

        // Actualizar la lista de empleados después de la eliminación
        this.getEmpleados();
      },
      (error) => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }


  getDepartamentos() {
    this.departamentoService.getDepartamento().subscribe(
      (data: any) => {
        this.departamentos = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de departamentos:', error);
      }
    );
  }

  getAdministradores() {
    this.administradorService.getAdministrador().subscribe(
      (data: any) => {
        this.administradores = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de administradores:', error);
      }
    );
  }

  getContratos() {
    this.contratoService.getContrato().subscribe(
      (data: any) => {
        this.contratos = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de contratos:', error);
      }
    );
  }

  getAreas() {
    this.areaService.getArea().subscribe(
      (data: any) => {
        this.areas = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de areas:', error);
      }
    );
  }

  getSedes() {
    this.sedeService.getAllSedes().subscribe(
      (data: any) => {
        this.sedes = data; // Asumiendo que la respuesta del servidor es un arreglo de sedes
        console.log('Sedes recuperadas:', this.sedes); // Imprime los datos recuperados en la consola para verificar
      },
      (error: any) => {
        console.error('Error al obtener la lista de sedes:', error);
      }
    );
  }


  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedArea: string = '';
  selectedContrato : string = '';

  get filteredEmpleados(): Empleado[] {
    return this.empleados.filter(empleado =>
      (empleado.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || this.searchTerm === '') &&
      (this.selectedDepartment === '' || empleado.Departamento === this.selectedDepartment) &&
      (this.selectedArea === '' || empleado.AreaTrabajo === this.selectedArea) &&
      (this.selectedContrato === '' || empleado.Contrato ===  this.selectedContrato)
    );
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.selectedArea = '';
    this.selectedContrato = '';
  }

  ngOnInit(): void {
    this.getEmpleados();
    this.getDepartamentos();
    this.getAdministradores();
    this.getContratos();
    this.getAreas();
    this.getSedes();



    this.activeRoute.url.subscribe(url => {
      this.isEditRoute = url.join('/') === 'rg_emp/edit';
    });

    const correo = this.activeRoute.snapshot.params['correo'];
  if (correo) {
    this.edit = true;
    this.empleadoService.getEmpleadoByCorreo(correo).subscribe(
      (res: Empleado) => {
        console.log(res);
        this.empleado = res; // Asignar los datos del empleado recuperados del servicio al modelo empleado

        // Convertir las fechas a objetos Date si no están en el formato correcto
        this.empleado.FechaNac = new Date(this.empleado.FechaNac);
        this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);
        this.empleado.FechaDeIngreso = new Date(this.empleado.FechaDeIngreso);

        // No es necesario convertir las horas a objetos Date ya que los campos de hora usan tipo 'time'

        // Imprimir el objeto empleado en la consola para verificar
        console.log('Empleado recuperado:', this.empleado);
      },
      (err) => console.error(err)
    );
  }

}

}
