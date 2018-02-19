import { Injectable } from '@angular/core';

@Injectable()
export class DatosLocalProvider {

  public datos: any = {};

  constructor() {}

  public setDatos(info) {
    this.datos = {
      detalle_local_id: info.detalle_local_id,
      local_id: info.local_id,
      local_nombre: info.local_nombre,
      local_direccion: info.local_direccion,
      local_email: info.local_email,
      local_telefono: info.local_telefono,
      local_celular: info.local_celular
    };
  }

}
