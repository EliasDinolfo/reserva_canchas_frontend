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
import { ComplejosComponent } from './complejos/complejos.component';
import { CrearComplejoComponent } from './complejos/crear-complejo/crear-complejo.component';
import { ActualizarComplejoComponent } from './complejos/actualizar-complejo/actualizar-complejo.component';
import { VerComplejoComponent } from './complejos/ver-complejo/ver-complejo.component';
import { VerUsuarioComponent } from './usuarios/ver-usuario/ver-usuario.component';
import { CanchasComponent } from './canchas/canchas.component';
import { ReservarCanchasComponent } from './canchas/reservar-canchas/reservar-canchas.component';
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
      { path: 'complejos', component: ComplejosComponent },
      { path: 'crear-complejo', component: CrearComplejoComponent },
      {
        path: 'actualizar-complejo/:id',
        component: ActualizarComplejoComponent,
      },
      {
        path: 'ver-complejo/:id',
        component: VerComplejoComponent,
      },
      { path: 'canchas', component: CanchasComponent },
      { path: 'reservar-canchas/:id', component: ReservarCanchasComponent },
      { path: ':id', component: InicioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
