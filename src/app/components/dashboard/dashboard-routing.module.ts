import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { CrearProvinciaComponent } from './provincias/crear-provincia/crear-provincia.component';
import { ActualizarProvinciaComponent } from './provincias/actualizar-provincia/actualizar-provincia.component';
import { VerProvinciaComponent } from './provincias/ver-provincia/ver-provincia.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { CrearCiudadComponent } from './ciudades/crear-ciudad/crear-ciudad.component';
import { ActualizarCiudadComponent } from './ciudades/actualizar-ciudad/actualizar-ciudad.component';
import { VerCiudadComponent } from './ciudades/ver-ciudad/ver-ciudad.component';
import { VerUsuarioComponent } from './usuarios/ver-usuario/ver-usuario.component';
//import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      //{ path: 'reportes', component: ReportesComponent}
      { path: 'crear-usuario', component: CrearUsuarioComponent },
      {
        path: 'actualizar-usuario/:id',
        component: ActualizarUsuarioComponent,
      },
      {
        path: 'ver-usuario/:id',
        component: VerUsuarioComponent,
      },
      { path: 'provincias', component: ProvinciasComponent },
      { path: 'crear-provincia', component: CrearProvinciaComponent },
      {
        path: 'actualizar-provincia/:id',
        component: ActualizarProvinciaComponent,
      },
      {
        path: 'ver-provincia/:id',
        component: VerProvinciaComponent,
      },
      { path: 'ciudades', component: CiudadesComponent },
      { path: 'crear-ciudad', component: CrearCiudadComponent },
      {
        path: 'actualizar-ciudad/:id',
        component: ActualizarCiudadComponent,
      },
      {
        path: 'ver-ciudad/:id',
        component: VerCiudadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
