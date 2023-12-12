import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FooterComponent } from './footer/footer.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { VerProvinciaComponent } from './provincias/ver-provincia/ver-provincia.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { ActualizarCiudadComponent } from './ciudades/actualizar-ciudad/actualizar-ciudad.component';
import { VerCiudadComponent } from './ciudades/ver-ciudad/ver-ciudad.component';
//import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    FooterComponent,
    ProvinciasComponent,
    VerProvinciaComponent,
    CiudadesComponent,
    VerCiudadComponent,
    /* CrearCiudadComponent, */
    /*  CrearProvinciaComponent, */
    //ReportesComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, FormsModule],
})
export class DashboardModule {}
