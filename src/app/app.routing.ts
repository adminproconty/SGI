import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresaComponent } from './administrador/empresa/empresa.component';
import { LocalesComponent } from './administrador/locales/locales.component';
import { IvaComponent } from './administrador/iva/iva.component';
import { RolesComponent } from './administrador/roles/roles.component';

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
                path: 'iva',
                component: IvaComponent
            }, {
                path: 'roles',
                component: RolesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }