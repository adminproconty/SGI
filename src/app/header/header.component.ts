import { Component, OnInit } from '@angular/core';
import { DatosLocalProvider } from '../providers/datos.local.provider';
import { DatosUsuarioProvider } from './../providers/datos.usuario.provider';
import { DatosEmpresaProvider } from './../providers/datos.empresa.provider';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  local: any;
  empresa: any;
  usuario: any;

  constructor(
    private datosEmpresa: DatosEmpresaProvider,
    private datosUsuario: DatosUsuarioProvider,
    private datosLocal: DatosLocalProvider) {}

  ngOnInit() {
    this.local = this.datosLocal.datos;
    this.empresa = this.datosEmpresa.datos;
    this.usuario = this.datosUsuario.datos;
    console.log('usuario', this.usuario);
    console.log('empresa', this.empresa);
    console.log('local', this.local);
  }
}
