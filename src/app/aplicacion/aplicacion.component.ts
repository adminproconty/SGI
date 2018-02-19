import { DatosUsuarioProvider } from '../providers/datos.usuario.provider';
import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatosEmpresaProvider } from '../providers/datos.empresa.provider';
import { EmpresaProvider } from '../administrador/empresa/empresa.provider';
import { DatosLocalProvider } from '../providers/datos.local.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apicacion',
  templateUrl: 'aplicacion.component.html',
  styleUrls: ['aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  constructor(private empresaProvider: EmpresaProvider,
    private infoEmpresa: DatosEmpresaProvider,
    private infoUsuario: DatosUsuarioProvider,
    private infoLocal: DatosLocalProvider,
    private router: Router) {}

    ngOnInit() {
      if (localStorage.getItem('usuario')) {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        console.log('usuario', usuario);
        const locales = JSON.parse(localStorage.getItem('locales'));
        console.log('locales', locales);
        const empresa = JSON.parse(localStorage.getItem('datosEmpresa'));
        this.infoEmpresa.setDatos(
          {
            id: empresa.id * 1,
            nombre_comercial: empresa.nombre_comercial,
            nombre_legal: empresa.nombre_legal,
            email: empresa.email,
            RUC: empresa.RUC,
            direccion: empresa.direccion,
            telefono: empresa.telefono,
            celular: empresa.celular
          }
        );
        this.infoLocal.setDatos(
          {
            detalle_local_id: locales[0].detalle_local_id,
            local_id: locales[0].local_id,
            local_nombre: locales[0].local_nombre,
            local_direccion: locales[0].local_direccion,
            local_email: locales[0].local_email,
            local_telefono: locales[0].local_telefono,
            local_celular: locales[0].local_celular
          }
        );
        this.infoUsuario.setDatos(
          {
            id: usuario.id,
            apellido: usuario.apellido,
            celular: usuario.celular,
            clave: usuario.clave,
            email: usuario.email,
            empleado_id: usuario.empleado_id,
            empresa_id: usuario.empresa_id,
            nombre: usuario.nombre,
            num_documento: usuario.num_documento,
            tipo_documento: usuario.tipo_documento,
            tipo_documento_id: usuario.tipo_documento_id
          }
        );
        this.router.navigate(['/dahsboard']);
      } else {
        this.router.navigate(['/login']);
      }
    }
}
