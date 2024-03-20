import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { CrudAdminComponent } from './components/crud-admin/crud-admin.component';
import { CrudContratoComponent } from './components/crud-contrato/crud-contrato.component';
import { SolicitudSupAdminComponent } from './components/solicitud-sup-admin/solicitud-sup-admin.component';
import { TurnoComponent } from './components/turno/turno.component';
import { AreaComponent } from './components/area/area.component';
import { SedesComponent } from './components/sede/sede.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rg_emp', component: RegisterEmployeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rg_emp/edit/:correo', component: RegisterEmployeComponent },
  { path: 'admin', component: CrudAdminComponent },
  { path: 'contrato', component: CrudContratoComponent},
  { path: 'solicitudsupad', component: SolicitudSupAdminComponent},
  { path: 'turno', component: TurnoComponent},
  { path: 'area', component: AreaComponent},
  { path: 'sede', component: SedesComponent},
  { path: 'inicio', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
