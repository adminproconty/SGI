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

  public getAllRoles() {
    return this.dominio + 'roles/getall.php';
  }

  public insertRol() {
    return this.dominio + 'roles/insert.php';
  }

  public updateRol() {
    return this.dominio + 'roles/update.php';
  }

  public getAllTipoDocumento() {
    return this.dominio + 'tipo_documento/getAll.php';
  }

  public getAllPersonas() {
    return this.dominio + 'personas/getAll.php';
  }

  public insertPersona() {
    return this.dominio + 'personas/insert.php';
  }

  public getPersonaInsertada() {
    return this.dominio + 'personas/getByEmpresaDocumento.php';
  }

  public getAllUsuarios() {
    return this.dominio + 'usuarios/getAll.php';
  }

  public insertUsuario() {
    return this.dominio + 'usuarios/insert.php';
  }

  public updateUsuario() {
    return this.dominio + 'personas/update.php';
  }

  public getAllEmpleados() {
    return this.dominio + 'empleados/getAll.php';
  }

  public getAllClientes() {
    return this.dominio + 'clientes/getAll.php';
  }

  public getAllCategorias() {
    return this.dominio + 'categorias/getAll.php';
  }

  public insertCategoria() {
    return this.dominio + 'categorias/insert.php';
  }

  public updateCategoria() {
    return this.dominio + 'categorias/update.php';
  }

  public getAllProductos() {
    return this.dominio + 'productos/getAll.php';
  }

  public getCodProducto() {
    return this.dominio + 'productos/getCodProducto.php';
  }

  public insertProducto() {
    return this.dominio + 'productos/insert.php';
  }

  public updateProducto() {
    return this.dominio + 'productos/update.php';
  }

  public getAllFisico() {
    return this.dominio + 'inventario/getAll.php';
  }

  public getFisicoByLocalProducto() {
    return this.dominio + 'inventario/getByLocalProducto.php';
  }

  public insertFisico() {
    return this.dominio + 'inventario/insert.php';
  }

  public updateFisico() {
    return this.dominio + 'inventario/update.php';
  }

  public deleteFisico() {
    return this.dominio + 'inventario/delete.php';
  }

}
