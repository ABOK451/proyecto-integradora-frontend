export interface Empleado {
    Nombre: String,
    AppE: String,
    ApmE: String,
    FechaNac: Date,
    Correo: String,
    Region: String,
    AreaTrabajo: String,
    Departamento: String,
    Contrato: String,
    TurnoActual: {
        HoraInicial: Date,
        HoraFinal: Date
    },
    HorarioTraining: {
        Fecha: Date,
        HoraInicial: Date,
        HoraFinal: Date
    },
    NombreAdmin:String,
    FechaDeIngreso: Date
}
