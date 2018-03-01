import { Injectable } from '@angular/core';

@Injectable()
export class ULRProvider {

  public dominio: String = 'http://localhost/SGI/api/';

  /*Empresa*/
  public getAllEmpresa() {
    return this.dominio + 'empresa/getAll.php';
  }

  public updateEmpresa() {
    return this.dominio + 'empresa/update.php';
  }

  /*Locales*/
  public getAllLocales() {
    return this.dominio + 'locales/getAll.php';
  }

  public insertLocal() {
    return this.dominio + 'locales/insert.php';
  }

  public updateLocal() {
    return this.dominio + 'locales/update.php';
  }

  /*Cuentas*/
  public getAllTipoCuentas() {
    return this.dominio + 'tipo_cuentas/getAll.php';
  }

  public getAllCuentas() {
    return this.dominio + 'cuentas/getAll.php';
  }

  public insertCuenta() {
    return this.dominio + 'cuentas/insert.php';
  }

  public updateCuenta() {
    return this.dominio + 'cuentas/update.php';
  }

  /*IVA*/
  public getAllIVA() {
    return this.dominio + 'iva/getAll.php';
  }

  public getIvaById() {
    return this.dominio + 'iva/getById.php';
  }

  public inserIVA() {
    return this.dominio + 'iva/insert.php';
  }

  public updateIva() {
    return this.dominio + 'iva/update.php';
  }

  /*Roles*/
  public getAllRoles() {
    return this.dominio + 'roles/getAll.php';
  }

  public insertRol() {
    return this.dominio + 'roles/insert.php';
  }

  public updateRol() {
    return this.dominio + 'roles/update.php';
  }

  /*Tipo Documentos*/
  public getAllTipoDocumento() {
    return this.dominio + 'tipo_documento/getAll.php';
  }

  /*Personas*/
  public getAllPersonas() {
    return this.dominio + 'personas/getAll.php';
  }

  public insertPersona() {
    return this.dominio + 'personas/insert.php';
  }

  public updatePersona() {
    return this.dominio + 'personas/update.php';
  }

  public getPersonaInsertada() {
    return this.dominio + 'personas/getByEmpresaDocumento.php';
  }

  /*Usuarios*/
  public getAllUsuarios() {
    return this.dominio + 'usuarios/getAll.php';
  }

  public getUsuarioById() {
    return this.dominio + 'usuarios/getById.php';
  }

  public insertUsuario() {
    return this.dominio + 'usuarios/insert.php';
  }

  public updateUsuario() {
    return this.dominio + 'usuarios/update.php';
  }

  /*Empleados_Local*/
  public getAllLocalUsuario() {
    return this.dominio + 'empleado_local/getAll.php';
  }

  public getLocalUsuarioByEmpleado() {
    return this.dominio + 'empleado_local/getByEmpleado.php';
  }

  public insertEmpleadoLocal() {
    return this.dominio + 'empleado_local/insert.php';
  }

  public asignarEmpleadoLocal() {
    return this.dominio + 'empleado_local/asignar.php';
  }

  public deleteAsignacion() {
    return this.dominio + 'empleado_local/delete.php';
  }

  /*Empleados*/
  public getAllEmpleados() {
    return this.dominio + 'empleados/getAll.php';
  }

  public getClienteByTipoDocumento () {
    return this.dominio + 'personas/getByTipoDocumento.php';
  }

  /*Clientes*/
  public getAllClientes() {
    return this.dominio + 'clientes/getAll.php';
  }

  /*Categorías*/
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

  public getProductoById() {
    return this.dominio + 'productos/getById.php';
  }

  public getCodProducto() {
    return this.dominio + 'productos/getCodProducto.php';
  }

  public getIdProductoByCodCategoria () {
    return this.dominio + 'productos/getIdByCodCategoria.php';
  }

  public getProductoByLocal() {
    return this.dominio + 'inventario/getByLocal.php';
  }

  public insertProducto() {
    return this.dominio + 'productos/insert.php';
  }

  public updateProducto() {
    return this.dominio + 'productos/update.php';
  }

  /*Costos*/
  public getCostoByProducto() {
    return this.dominio + 'costos/getByProducto.php';
  }

  public insertCosto() {
    return this.dominio + 'costos/insert.php';
  }

  /*Inventario*/
  public getAllFisico() {
    return this.dominio + 'inventario/getAll.php';
  }

  public getInvenatrioByLocal() {
    return this.dominio + 'inventario/getByLocal.php';
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

  /*Formas Pago*/
  public getAllFormasPago() {
    return this.dominio + 'formas_pago/getAll.php';
  }

  public getFormasPagoById() {
    return this.dominio + 'formas_pago/getById.php';
  }

  public getAllTipoTarjetas() {
    return this.dominio + 'tipos_tarjetas/getAll.php';
  }

  public getByLocalProducto() {
    return this.dominio + 'inventario/getByLocalProducto.php';
  }

  /*Facturas*/
  public insertFactura() {
    return this.dominio + 'facturas/insert.php';
  }

  public getAllFacturas() {
    return this.dominio + 'facturas/getAll.php';
  }

  /*Pagos factura*/
  public insertPagos() {
    return this.dominio + 'pagos_factura/insert.php';
  }

  /*Productos Factura*/
  public insertarProductosFactura() {
    return this.dominio + 'productos_factura/insert.php';
  }

  /*Login*/
  public entrar() {
    return this.dominio + 'login/entrar.php';
  }

  public localesUsuario() {
    return this.dominio + 'login/localesUsuario.php';
  }

  public getDatosEmpresa() {
    return this.dominio + 'login/getEmpresa.php';
  }

  /*Ingresos*/
  public insertIngresos() {
    return this.dominio + 'ingresos/insert.php';
  }

  public insertIngresosDirectos() {
    return this.dominio + 'ingresos_directos/insert.php';
  }

}
