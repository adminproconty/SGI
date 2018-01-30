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

  public getAllTipoCuentas() {
    return this.dominio + 'tipo_cuentas/getall.php';
  }

  public getAllCuentas() {
    return this.dominio + 'cuentas/getall.php';
  }

  public insertCuenta() {
    return this.dominio + 'cuentas/insert.php';
  }

  public updateCuenta() {
    return this.dominio + 'cuentas/update.php';
  }

  public getAllIVA() {
    return this.dominio + 'iva/getAll.php';
  }

  public inserIVA() {
    return this.dominio + 'iva/insert.php';
  }

}
