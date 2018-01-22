import { Injectable } from '@angular/core';

@Injectable()
export class DatosEmpresaProvider {

  public datos: any = {};

  constructor() {}

  public setDatos(info) {
    this.datos = {
      id: info.id,
      nombre_comercial: info.nombre_comercial,
      nombre_legal: info.nombre_legal,
      email: info.email,
      RUC: info.RUC,
      direccion: info.direccion,
      telefono: info.telefono,
      celular: info.celular
    };
  }

}
