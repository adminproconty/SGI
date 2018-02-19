import { DatosLocalProvider } from './../providers/datos.local.provider';
import { Router } from '@angular/router';
import { Component, TemplateRef, OnInit } from '@angular/core';

import { LoginProvider } from './login.provider';
import { DatosEmpresaProvider } from '../providers/datos.empresa.provider';
import { DatosUsuarioProvider } from '../providers/datos.usuario.provider';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  login: any = {};
  entrando: boolean;
  alerts: any = [];

  constructor(
    private service: LoginProvider,
    private datosEmpresa: DatosEmpresaProvider,
    private datosUsuario: DatosUsuarioProvider,
    private datosLocal: DatosLocalProvider,
    private router: Router) {}

  ngOnInit() {
    this.login = {
      correo: undefined,
      clave: undefined
    };
    this.entrando = false;
  }

  entrar(e) {
    e.preventDefault();
    console.log('login', this.login);
    this.service.entrar(this.login).subscribe(resp => {
      const datosUsuario = JSON.parse(resp['_body']);
      console.log('entrar', datosUsuario.data);
      if (datosUsuario.data.length > 0) {
        this.datosUsuario.setDatos(datosUsuario);
        if (datosUsuario.data[0].clave === this.login.clave) {
          localStorage.setItem('usuario', JSON.stringify(datosUsuario.data[0]));
          this.service.datosEmpresa({id: datosUsuario.data[0].id}).subscribe(res => {
            const empresaInfo = JSON.parse(res['_body']);
            console.log('datosEmpresa', empresaInfo);
            this.datosEmpresa.setDatos({
              id: empresaInfo.data[0].empresa_id,
              nombre_comercial: empresaInfo.data[0].nombre_comercial,
              nombre_legal: empresaInfo.data[0].nombre_legal,
              email: empresaInfo.data[0].empresa_email,
              RUC: empresaInfo.data[0].empresa_RUC,
              direccion: empresaInfo.data[0].empresa_direccion,
              telefono: empresaInfo.data[0].empresa_telefono,
              celular: empresaInfo.data[0].empresa_celular
            });
            localStorage.setItem('datosEmpresa', JSON.stringify(this.datosEmpresa.datos));
          });
          this.service.localesUsuario(datosUsuario.data[0]).subscribe(res => {
            const locales = JSON.parse(res['_body']);
            console.log('locales usuario', locales.data);
            localStorage.setItem('locales', JSON.stringify(locales.data));
            this.datosLocal.setDatos(locales.data[0]);
            this.router.navigate(['/dahsboard']);
          });
        } else {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Las claves no coinciden'
            }
          );
        }
      } else {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Usuario no encontrado'
          }
        );
      }
    });
  }
}

