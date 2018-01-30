import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { ULRProvider } from './providers/url.providers';

import { TranslationsModule } from './translation/translation.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavegationComponent } from './navegation/navegation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresaComponent } from './administrador/empresa/empresa.component';
import { LocalesComponent } from './administrador/locales/locales.component';
import { CuentasComponent } from './administrador/cuentas/cuentas.component';
import { IvaComponent } from './administrador/iva/iva.component';
import { RolesComponent } from './administrador/roles/roles.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { EmpleadosComponent } from './administrador/empleados/empleados.component';
import { ClientesComponent } from './ingresos/clientes/clientes.component';
import { IngresosComponent } from './ingresos/ingresos/ingresos.component';
import { ProveedoresComponent } from './egresos/proveedores/proveedores.component';
import { EgresosComponent } from './egresos/egresos/egresos.component';

import { NavegationProvider } from './navegation/navegation.provider';
import { EmpresaProvider } from './administrador/empresa/empresa.provider';
import { DatosEmpresaProvider } from './providers/datos.empresa.provider';
import { LocalesProvider } from './administrador/locales/locales.provider';
import { CuentasProvider } from './administrador/cuentas/cuentas.provider';

import {  DxCheckBoxModule,
          DxSelectBoxModule,
          DxNumberBoxModule,
          DxButtonModule,
          DxFormModule,
          DxFormComponent,
          DxTextBoxModule,
          DxValidatorModule,
          DxDataGridModule,
          DxTreeListModule,
          DxSwitchModule,
          DxDateBoxModule,
          DxTabsModule,
          DxLoadIndicatorModule,
          DxTemplateModule
        } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavegationComponent,
    DashboardComponent,
    EmpresaComponent,
    LocalesComponent,
    CuentasComponent,
    IvaComponent,
    RolesComponent,
    UsuariosComponent,
    EmpleadosComponent,
    ClientesComponent,
    IngresosComponent,
    ProveedoresComponent,
    EgresosComponent
  ],
  imports: [
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDataGridModule,
    DxSwitchModule,
    DxTreeListModule,
    DxDateBoxModule,
    DxTabsModule,
    DxLoadIndicatorModule,
    DxTemplateModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslationsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    AngularFontAwesomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    NavegationProvider,
    ULRProvider,
    EmpresaProvider,
    DatosEmpresaProvider,
    LocalesProvider,
    CuentasProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
