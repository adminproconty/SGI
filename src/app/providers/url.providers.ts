import { Injectable } from '@angular/core';

@Injectable()
export class ULRProvider {

  public dominio: String = 'http://127.0.0.1/sgi/api/';

  public getAllEmpresa() {
    return this.dominio + 'empresa/getall.php';
  }

  public updateEmpresa() {
    return this.dominio + 'empresa/update.php';
  }

  public getAllLocales() {
    return this.dominio + 'locales/getAll.php';
  }

  public insertLocal() {
    return this.dominio + 'locales/insert.php';
  }

  public updateLocal() {
    return this.dominio + 'locales/update.php';
  }

}
