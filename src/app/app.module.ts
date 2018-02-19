import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { ULRProvider } from './providers/url.providers';
import { DatePipe } from '@angular/common';

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
import { AplicacionComponent } from './aplicacion/aplicacion.component';
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
import { ProductosComponent } from './inventario/productos/productos.component';
import { FacturasComponent } from './ingresos/facturas/facturas.component';
import { FisicoComponent } from './inventario/fisico/fisico.component';
import { LoginComponent } from './login/login.component';

import { NavegationProvider } from './navegation/navegation.provider';
import { EmpresaProvider } from './administrador/empresa/empresa.provider';
import { DatosEmpresaProvider } from './providers/datos.empresa.provider';
import { DatosUsuarioProvider } from './providers/datos.usuario.provider';
import { DatosLocalProvider } from './providers/datos.local.provider';
import { LocalesProvider } from './administrador/locales/locales.provider';
import { CuentasProvider } from './administrador/cuentas/cuentas.provider';
import { IvaProvider } from './administrador/iva/iva.provider';
import { RolesProvider } from './administrador/roles/roles.provider';
import { UsuariosProvider } from './administrador/usuarios/usuarios.provider';
import { ProductosProvider } from './inventario/productos/productos.provider';
import { EmpleadosProvider } from './administrador/empleados/empleados.provider';
import { ClientesProvider } from './ingresos/clientes/clientes.provider';
import { FisicoProvider } from './inventario/fisico/fisico.provider';
import { FacturasProvider } from './ingresos/facturas/facturas.provider';
import { LoginProvider } from './login/login.provider';
import { IngresosProvider } from './ingresos/ingresos/ingresos.provider';


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
          DxTemplateModule,
          DxLookupModule,
          DxTagBoxModule,
          DxScrollViewComponent,
          DxScrollViewModule,
          DxPivotGridModule
        } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    AplicacionComponent,
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
    EgresosComponent,
    ProductosComponent,
    FacturasComponent,
    FisicoComponent,
    LoginComponent
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
    DxLookupModule,
    DxTagBoxModule,
    DxScrollViewModule,
    DxPivotGridModule,
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
    DatosUsuarioProvider,
    DatosLocalProvider,
    LocalesProvider,
    CuentasProvider,
    IvaProvider,
    RolesProvider,
    UsuariosProvider,
    ProductosProvider,
    EmpleadosProvider,
    ClientesProvider,
    FisicoProvider,
    FacturasProvider,
    LoginProvider,
    IngresosProvider,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
