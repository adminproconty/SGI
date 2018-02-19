import { Injectable } from '@angular/core';

@Injectable()
export class DatosUsuarioProvider {

  public datos: any = {};

  constructor() {}

  public setDatos(info) {
    this.datos = {
      id: info.id,
      apellido: info.apellido,
      celular: info.celular,
      clave: info.clave,
      email: info.email,
      empleado_id: info.empleado_id,
      empresa_id: info.empresa_id,
      nombre: info.nombre,
      num_documento: info.num_documento,
      tipo_documento: info.tipo_documento,
      tipo_documento_id: info.tipo_documento_id
    };
  }

}
