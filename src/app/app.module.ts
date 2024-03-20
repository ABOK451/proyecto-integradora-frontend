import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterEmployeComponent } from './components/register-employe/register-employe.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CrudAdminComponent } from './components/crud-admin/crud-admin.component';
import { CrudContratoComponent } from './components/crud-contrato/crud-contrato.component';
import { SedesComponent } from './components/sede/sede.component';
import { AreaComponent } from './components/area/area.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    RegisterEmployeComponent,
    CrudAdminComponent,
    CrudContratoComponent,
    SedesComponent,
    AreaComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,


  ],
  providers: [
    provideHttpClient(),   // Add this line inside the providers array
    CrudAdminComponent,
    CrudContratoComponent
  ]
})
export class AppModule { }
