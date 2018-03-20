import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe } from '@angular/common';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { ComprasProvider } from './compras.provider';

@Component({
  templateUrl: 'compras.component.html',
  styleUrls: ['compras.component.css']
})

export class ComprasComponent implements OnInit {
  noDataText: string;
  cancelAllChanges: string;
  cancelRowChanges: string;
  confirmDeleteMessage: string;
  deleteRow: string;
  editRow: string;
  saveAllChanges: string;
  saveRowChanges: string;
  undeleteRow: string;
  validationCancelChanges: string;

  modalRef: BsModalRef;
  backClick: boolean;
  guardando: boolean;
  alerts: any = [];
  tabs: any = [];
  tabContent: string;
  stock_inicial: boolean;
  proveedores: any = [
    {
      id: 0,
      documento: '12345',
      nombre: 'nombre'
    }
  ];
  productos: any = [
    {
      id: 0,
      codigo: 'BCBCBC',
      costo: 20,
      nombre: 'Producto'
    }
  ];
  producto: any = {
    producto_id: 0,
    cantidad: 1,
    precio_unitario: 0,
    subtotal: 0,
    iva: 0,
    total_iva: 0
  };
  carrito: any = [];
  ivas: any = [];
  locales: any = [];
  formasPago: any = [];
  formaPago: any;
  compra: any = {
    serie: '',
    documento: '',
    autorizacion: '',
    descripcion: '',
    subtotal: 0,
    iva: 0,
    total_iva: 0,
    total: 0,
    detalle_iva: 0,
    stock_inicial: 0,
    proveedor_id: 0,
    cancela: 0,
    vuelto: 0
  };
  visualizar: boolean;
  pago: any = {};
  cuentas: any = [];
  bancos: any = [];
  pagos: any = [];
  tarjetas: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: ComprasProvider,
    private datepipe: DatePipe) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'treeview',
            hijos: {
                empresa: '',
                locales: '',
                cuentas: '',
                iva: '',
                roles: '',
                usuarios: '',
                empleados: ''
            }
        },
        ingresos: {
            clase: 'treeview',
            hijos: {
                clientes: '',
                facturas: '',
                ingresos: ''
            }
        },
        egresos: {
            clase: 'active treeview',
            hijos: {
                proveedores: '',
                compras: 'active',
                egresos: ''
            }
        },
        contabilidad: {
            clase: 'treeview',
            hijos: {
                asientos: '',
                plan: '',
                mayores: '',
                nuevo: '',
                bancos: '',
                activos: ''
            }
        },
        impuestos: {
            clase: 'treeview',
            hijos: {
                retenciones: '',
                iva: ''
            }
        },
        reportes: {
            clase: 'treeview',
            hijos: {
                dashboard: '',
                epg: '',
                centro: '',
                balances: '',
                reportes: '',
                presupuestos: '',
                totales: '',
                movimientos: ''
            }
        },
        inventario: {
            clase: 'treeview',
            hijos: {
                productos: '',
                requision: '',
                fisico: '',
                cardex: ''
            }
        }
      }
    );
    this.service.allProveedores().subscribe(resp => {
      console.log('proveedores', resp.data);
      this.proveedores = resp.data;
    });
    this.service.getAllProductos().subscribe(resp => {
      console.log('productos', resp.data);
      this.productos = resp.data;
      this.service.getProductoById({id: resp.data[0].id}).subscribe(res => {
        const data = JSON.parse(res['_body']);
        this.producto.producto_id = data.data[0].id * 1;
        this.producto.cantidad = 1;
        this.producto.precio_unitario = 0;
        this.producto.subtotal = 0;
        this.producto.iva = 0;
        this.producto.total_iva = 0;
        this.producto.nombre = data.data[0].nombre;
        this.producto.codigo = data.data[0].codigo;
        this.producto.total = 0;
        this.producto.local_id = 0;
      });
    });
    this.pago = {
      compras_id: 0,
      cxp_id: 'NULL',
      metodo_id: 'NULL',
      metodo: '',
      cantidad_cancelada: 0,
      tarjeta_id: 'NULL',
      autorizacion_tarjeta: '',
      cuenta_id: 'NULL',
      numero_cheque: '',
      codigo_transferencia: '',
      banco_receptor_id: 'NULL',
      institucion: '',
      observacion: ''
    };
  }

  ngOnInit() {
    this.visualizar = false;
    this.tabs = [
      {
        id: 0,
        text: 'Pedido',
        content: 'Pedido'
      }, {
        id: 1,
        text: 'Pago',
        content: 'Pago'
      }
    ];
    this.tabContent = 'Pedido';
    this.noDataText = 'No hay data';
    this.cancelAllChanges = 'Cancelar';
    this.cancelRowChanges = 'Cancelar';
    this.confirmDeleteMessage = 'Todos los registros a este local serán borrados también, ¿está seguro?';
    this.deleteRow = 'Eliminar';
    this.editRow = 'Editar';
    this.saveAllChanges = 'Guardar';
    this.saveRowChanges = 'Guardar';
    this.undeleteRow = 'No eliminar';
    this.validationCancelChanges = 'Cancelar';
    this.stock_inicial = false;
    this.service.allProveedores().subscribe(resp => {
      console.log('proveedores', resp.data);
      this.proveedores = resp.data;
      this.compra.proveedor_id = resp.data[0].id;
    });
    this.carrito = [];
    this.service.getAllIVAS().subscribe(resp => {
      console.log('IVAs', resp.data);
      this.ivas = resp.data;
      this.producto.iva = resp.data[0].cantidad * 1;
    });
    this.service.getAllLocales().subscribe(resp => {
      console.log('locales', resp.data);
      this.locales = resp.data;
    });
    this.service.getAllCuentas().subscribe(resp => {
      console.log('cuentas', resp.data);
      this.cuentas = resp.data;
    });
    this.service.getAllBancos().subscribe(resp => {
      console.log('bancos', resp.data);
      this.bancos = resp.data;
    });
    this.service.getAllTarjetas().subscribe(resp => {
      console.log('tarjetas', resp.data);
      this.tarjetas = resp.data;
    });
    this.service.getAllFormasPago().subscribe(resp => {
      console.log('formas pago', resp.data);
      this.formasPago = resp.data;
      this.formaPago = resp.data[0];
      this.visualizar = true;
    });
    this.compra.serie = '';
    this.compra.documento = '';
    this.compra.autorizacion = '';
    this.compra.descripcion = '';
    this.compra.subtotal = 0;
    this.compra.iva = 0;
    this.compra.total_iva = 0;
    this.compra.total = 0;
    this.compra.cancela = '';
    this.compra.vuelto = '';
    this.compra.detalle_iva = 0;
    this.pago.metodo = '';
    this.pago.compras_id = 0;
    this.pago.cxp_id = 'NULL';
    this.pago.cantidad_cancelada = 0;
    this.pago.tipo_tarjeta = '';
    this.pago.banco = '';
    this.pago.marca_tarjeta = '';
    this.pago.autorizacion_tarjeta = '';
    this.pago.numero_cheque = '';
    this.pago.codigo_transferencia = '';
    this.pago.detalles_cuenta = '';
    this.pago.institucion = '';
    this.pago.observacion = '';
    this.pagos = [];
    this.guardando = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar(e) {
    e.preventDefault();
    this.guardando = true;
    console.log('a guardar', this.compra);
    if (this.compra.stock_inicial === 1) {
      this.compra.proveedor_id = 'NULL';
    }
    this.service.insert(this.compra).subscribe(resp => {
      console.log('insert', resp['_body']);
      if (resp['_body'] !== 'false') {
        this.guardarProductos(resp['_body']);
      } else {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
        this.ngOnInit();
      }
    });
  }

  guardarProductos(compra) {
    const compraId = compra;
    let guardadoExitoso = 1;
    for (let i = 0; i < this.carrito.length; i++) {
      this.carrito[i].compras_id = compraId;
      this.service.insertProductos(this.carrito[i]).subscribe(resp => {
        console.log('a guardar producto', this.carrito[i]);
        console.log('insert producto', resp['_body']);
        if (resp['_body'] === 'false') {
          guardadoExitoso = 0;
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
        }
      });
    }
    if (guardadoExitoso === 1) {
      if (this.compra.stock_inicial === 1) {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Insertado exitosamente'
          }
        );
        this.ngOnInit();
      } else {
        this.guardarPagos(compraId);
      }
    }
  }

  guardarPagos(compra) {
    let guardadoExitoso = 1;
    for (let i = 0; i < this.pagos.length; i++) {
      let registroPago = {};
      if (this.pagos[i].metodo === 'Efectivo') {
        registroPago = {
          compras_id: compra,
          cxp_id: 'NULL',
          metodo_id: this.pagos[i].metodo_id,
          cantidad_cancelada: this.pagos[i].cantidad_cancelada,
          tarjeta_id: 'NULL',
          autorizacion_tarjeta: 'NULL',
          cuenta_id: 'NULL',
          numero_cheque: 'NULL',
          codigo_transferencia: 'NULL',
          banco_receptor_id: 'NULL',
          institucion: 'NULL',
          observacion: 'NULL'
        };
      } else if (this.pagos[i].metodo === 'Tarjeta') {
        registroPago = {
          compras_id: compra,
          cxp_id: 'NULL',
          metodo_id: this.pagos[i].metodo_id,
          cantidad_cancelada: this.pagos[i].cantidad_cancelada,
          tarjeta_id: this.pagos[i].tarjeta_id,
          autorizacion_tarjeta: this.pagos[i].autorizacion_tarjeta,
          cuenta_id: 'NULL',
          numero_cheque: 'NULL',
          codigo_transferencia: 'NULL',
          banco_receptor_id: 'NULL',
          institucion: 'NULL',
          observacion: this.pagos[i].observacion
        };
      } else if (this.pagos[i].metodo === 'Transferencia bancaria') {
        registroPago = {
          compras_id: compra,
          cxp_id: 'NULL',
          metodo_id: this.pagos[i].metodo_id,
          cantidad_cancelada: this.pagos[i].cantidad_cancelada,
          tarjeta_id: 'NULL',
          autorizacion_tarjeta: 'NULL',
          cuenta_id: this.pagos[i].cuenta_id,
          numero_cheque: 'NULL',
          codigo_transferencia: this.pagos[i].codigo_transferencia,
          banco_receptor_id: this.pagos[i].banco_receptor_id,
          institucion: 'NULL',
          observacion: this.pagos[i].observacion
        };
      } else if (this.pagos[i].metodo === 'Cheque') {
        registroPago = {
          compras_id: compra,
          cxp_id: 'NULL',
          metodo_id: this.pagos[i].metodo_id,
          cantidad_cancelada: this.pagos[i].cantidad_cancelada,
          tarjeta_id: 'NULL',
          autorizacion_tarjeta: 'NULL',
          cuenta_id: this.pagos[i].cuenta_id,
          numero_cheque: this.pagos[i].numero_cheque,
          codigo_transferencia: 'NULL',
          banco_receptor_id: 'NULL',
          institucion: 'NULL',
          observacion: this.pagos[i].observacion
        };
      } else if (this.pagos[i].metodo === 'Pago electrónico') {
        registroPago = {
          compras_id: compra,
          cxp_id: 'NULL',
          metodo_id: this.pagos[i].metodo_id,
          cantidad_cancelada: this.pagos[i].cantidad_cancelada,
          tarjeta_id: 'NULL',
          autorizacion_tarjeta: 'NULL',
          cuenta_id: 'NULL',
          numero_cheque: 'NULL',
          codigo_transferencia: 'NULL',
          banco_receptor_id: 'NULL',
          institucion: this.pagos[i].institucion,
          observacion: this.pagos[i].observacion
        };
      }
      console.log('pago a insertar', registroPago);
      this.service.insertPagosCompra(registroPago).subscribe(resp => {
        console.log('insert pago', resp['_body']);
        if (resp['_body'] === 'false') {
          guardadoExitoso = 0;
        }
      });
    }
    if (guardadoExitoso === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Insertado exitosamente'
        }
      );
      this.ngOnInit();
    } else {
      this.alerts.push(
        {
          type: 'danger',
          msg: 'Error, por favor contacte al administrador del sistema'
        }
      );
      this.ngOnInit();
    }
  }

  cancelar() {
    this.ngOnInit();
  }

  editar(e) {
    console.log('a editar', e);
  }

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
  }

  siguiente(e) {
    e.preventDefault();
    if (this.compra.stock_inicial === 1) {
      this.guardar(e);
    } else {
      this.tabContent = 'Pago';
    }
  }

  cambioStockInicial(e) {
    if (e.value === true) {
      this.compra.stock_inicial = 1;
    } else {
      this.compra.stock_inicial = 0;
    }
  }

  displayProveedores(item) {
    if (!item) {
      return '';
    }
    return 'Documento: ' + item.documento +
            ' Nombre/Razón Social: ' + item.nombre;
  }

  cambioProveedor(e) {
    console.log('cambio proveedor', e);
    const id = e.value * 1;
    this.compra.proveedor_id = id;
  }

  cambioFechaComprobante(e) {
    console.log('cambio fecha comprobante', e);
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.compra.fecha_comprobante = this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }

  cambioFechaIngreso(e) {
    console.log('cambio fecha Ingreso', e);
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.compra.fecha_ingreso = this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }

  cambioFechaCaducidad(e) {
    console.log('cambio fecha caducidad', e);
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.compra.fecha_caducidad = this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }

  cambioVencimiento(e) {
    console.log('cambio vencimiento', e);
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.compra.vencimiento = this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }

  displayProductos(item) {
    if (!item) {
      return '';
    }
    return 'Código: ' + item.codigo +
            ' Nombre: ' + item.nombre;
  }

  cambioProducto(e) {
    console.log('cambio producto', e);
    const id = e.value * 1;
    this.service.getProductoById({id: id}).subscribe(res => {
      const data = JSON.parse(res['_body']);
      this.producto.producto_id = data.data[0].id;
      this.producto.cantidad = 0;
      this.producto.precio_unitario = 0;
      this.producto.subtotal = 0;
      this.producto.total_iva = 0;
      this.producto.nombre = data.data[0].nombre;
      this.producto.codigo = data.data[0].codigo;
    });
  }

  cambioIVA(e) {
    console.log('cambio iva', e);
    const id = e.value * 1;
    this.service.getIvaById({id: id}).subscribe(resp => {
      const iva = JSON.parse(resp['_body']);
      console.log('iva por id', iva);
      this.producto.iva = iva.cantidad * 1;
    });
  }

  cambioLocal(e) {
    console.log('cambio local', e);
    this.producto.local_id = e.value * 1;
  }

  agregarCarrito() {
    const subtotal =  this.producto.cantidad * this.producto.precio_unitario;
    this.producto.subtotal = subtotal;
    const iva = (subtotal * this.producto.iva) / 100;
    this.producto.total_iva = iva.toFixed(2);
    const total = (subtotal + iva).toFixed(2);
    this.producto.total = total;
    this.carrito.push({
      cantidad: this.producto.cantidad,
      codigo: this.producto.codigo,
      iva: this.producto.iva,
      local_id: this.producto.local_id,
      nombre: this.producto.nombre,
      precio_unitario: this.producto.precio_unitario,
      producto_id: this.producto.producto_id,
      subtotal: this.producto.subtotal,
      total: this.producto.total,
      total_iva: this.producto.total_iva
    });
    console.log('carrito', this.carrito);
    this.calcularSubtotal();
  }

  agregarPago(e) {
    e.preventDefault();
    this.pagos.push(
      {
        compras_id: this.pago.compras_id,
        cxp_id: 'NULL',
        metodo_id: this.pago.metodo_id,
        metodo: this.pago.metodo,
        cantidad_cancelada: this.pago.cantidad_cancelada,
        tarjeta_id: this.pago.tarjeta_id,
        autorizacion_tarjeta: this.pago.autorizacion_tarjeta,
        cuenta_id: this.pago.cuenta_id,
        numero_cheque: this.pago.numero_cheque,
        codigo_transferencia: this.pago.codigo_transferencia,
        banco_receptor_id: this.pago.banco_receptor_id,
        institucion: this.pago.institucion,
        observacion: this.pago.observacion
      }
    );
    console.log('pagos', this.pagos);
    this.calcularPagos();
  }

  cambioFormaPago(e) {
    const formaId = e.value * 1;
    this.service.getFormasPagoById({id: formaId}).subscribe(resp => {
      const forma = JSON.parse(resp['_body']);
      console.log('get forma de pago', forma);
      this.formaPago = forma.data[0];
      this.pago.metodo_id = this.formaPago.id;
      this.pago.metodo = this.formaPago.nombre;
    });
  }

  eliminarProducto(producto) {
    console.log('carrito', this.carrito);
    const index = this.carrito.indexOf(producto);
    this.carrito.splice(index, 1);
    if (this.carrito.length > 0) {
      this.calcularSubtotal();
    } else {
      this.compra.subtotal = 0;
      this.compra.iva = 0;
      this.compra.total_iva = 0;
      this.compra.total = 0;
      this.compra.detalle_iva = 0;
    }
    console.log('carrito', this.carrito);
  }

  displayIvas(item) {
    if (!item) {
      return '';
    }
    return item.nombre + ' - ' + item.cantidad + '%';
  }

  calcularSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      subtotal = subtotal + this.carrito[i].subtotal;
    }
    this.compra.subtotal = subtotal.toFixed(2);
    this.calcularIVA(subtotal);
  }

  calcularIVA(sub) {
    let iva = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      iva = iva + (this.carrito[i].total_iva * 1);
    }
    this.compra.total_iva = iva.toFixed(2);
    this.calcularDetalle();
    this.calcularTotal(sub, iva);
  }

  calcularDetalle() {
    let detalle = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].iva === 0) {
        detalle = detalle = this.carrito[i].subtotal;
      }
    }
    this.compra.detalle_iva = detalle.toFixed(2);
  }

  calcularTotal(sub, iva) {
    const total = sub + iva;
    this.compra.total = total.toFixed(2);
  }

  cambioTarjeta(e) {
    console.log('cambio tarjeta', e);
    this.pago.tarjeta_id = e.value * 1;
    this.service.getTarjetaById({id: e.value}).subscribe(resp => {
      const detalleTarjeta = JSON.parse(resp['_body']);
      console.log('detalle tarjeta escogida', detalleTarjeta);
      this.pago.tipo_tarjeta = detalleTarjeta.data[0].tipo_tarjeta;
      this.pago.marca_tarjeta = detalleTarjeta.data[0].marca_tarjeta;
      this.pago.banco = detalleTarjeta.data[0].banco;
    });
  }

  cambioCuenta(e) {
    console.log('cambio cuenta', e);
    this.pago.cuenta_id = e.value * 1;
    this.service.getCuentaById({id: this.pago.cuenta_id}).subscribe(resp => {
      const detalleCuenta = JSON.parse(resp['_body']);
      this.pago.detalles_cuenta = detalleCuenta.data[0].nombre + ', ' +
        detalleCuenta.data[0].banco + ', ' + detalleCuenta.data[0].tipo_cuenta;
    });
  }

  cambioBancoReceptor(e) {
    console.log('cambio banco receptor', e);
    this.pago.cuenta_id = e.value * 1;
  }

  eliminarPago(pago) {
    const index = this.pagos.indexOf(pago);
    this.pagos.splice(index, 1);
    console.log('pagos', this.pagos);
    this.calcularPagos();
  }

  onContentReady(e) {
    e.component.columnOption('command:edit', {
       visibleIndex: -1,
       width: 80
     });
  }

  onCellPrepared(e) {
    if (e.rowType === 'data' && e.column.command === 'edit') {
        const isEditing = e.row.isEditing,
            cellElement = e.cellElement;

        if (isEditing) {
            const saveLink = cellElement.querySelector('.dx-link-save'),
                cancelLink = cellElement.querySelector('.dx-link-cancel');

            saveLink.classList.add('dx-icon-save');
            cancelLink.classList.add('dx-icon-revert');

            saveLink.textContent = '';
            cancelLink.textContent = '';
        } else {
            const editLink = cellElement.querySelector('.dx-link-edit'),
                deleteLink = cellElement.querySelector('.dx-link-delete');

            editLink.classList.add('dx-icon-edit');

            editLink.textContent = '';
        }
    }
  }

  calcularPagos() {
    let paga = 0;
    let vuelto = 0;
    if (this.pagos.length > 0) {
      const total = this.compra.total * 1;
      for (let i = 0; i < this.pagos.length; i++) {
        paga = paga + (this.pagos[i].cantidad_cancelada * 1);
      }
      this.compra.cancela = paga;
      vuelto = paga - total;
      this.compra.vuelto = vuelto;
    } else {
      this.compra.cancela = 0;
      this.compra.vuelto = 0;
    }
    if (vuelto >= 0) {
      this.guardando = false;
    } else {
      this.guardando = true;
    }
  }

  atras() {
    this.tabContent = 'Pedido';
  }

}
