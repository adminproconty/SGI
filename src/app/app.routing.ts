import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresaComponent } from './administrador/empresa/empresa.component';
import { LocalesComponent } from './administrador/locales/locales.component';
import { CuentasComponent } from './administrador/cuentas/cuentas.component';
import { IvaComponent } from './administrador/iva/iva.component';
import { RolesComponent } from './administrador/roles/roles.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { EmpleadosComponent } from './administrador/empleados/empleados.component';
import { ClientesComponent } from './ingresos/clientes/clientes.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent
    }, {
      path: 'administrador',
      children: [
          {
            path: 'empresa',
            component: EmpresaComponent
          }, {
            path: 'locales',
            component: LocalesComponent
          }, {
            path: 'cuentas',
            component: CuentasComponent
          }, {
            path: 'iva',
            component: IvaComponent
          }, {
            path: 'roles',
            component: RolesComponent
          }, {
            path: 'usuarios',
            component: UsuariosComponent
          }, {
            path: 'empleados',
            component: EmpleadosComponent
          }
        ]
    }, {
      path: 'ingresos',
      children: [
        {
          path: 'clientes',
          component: ClientesComponent
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
