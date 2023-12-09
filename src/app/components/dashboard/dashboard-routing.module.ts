import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { CrearProvinciaComponent } from './provincias/crear-provincia/crear-provincia/crear-provincia.component';
import { ActualizarProvinciaComponent } from './provincias/actualizar-provincia/actualizar-provincia/actualizar-provincia.component';
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
      { path: 'provincias', component: ProvinciasComponent },
      { path: 'crear-provincia', component: CrearProvinciaComponent },
      {
        path: 'actualizar-provincia/:id',
        component: ActualizarProvinciaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
