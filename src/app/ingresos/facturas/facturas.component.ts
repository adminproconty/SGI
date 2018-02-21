import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { FacturasProvider } from './facturas.provider';
import { DatosLocalProvider } from '../../providers/datos.local.provider';
import { DatosUsuarioProvider } from '../../providers/datos.usuario.provider';

@Component({
  selector: 'app-facturas',
  templateUrl: 'facturas.component.html',
  styleUrls: ['facturas.component.css']
})

export class FacturasComponent implements OnInit {
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

  guardando: boolean;
  alerts: any = [];
  facturas: any = [];
  facturando: boolean;
  tipoDocumentos: any = [];
  factura: any = {};
  phonePattern: any;
  phoneRules: any;
  carrito: any = [];
  cliente: any = {};
  consumidorfinal: boolean;
  productos: any = [];
  producto: any = {};
  ivas: any = [];
  formasPago: any = [];
  formaPago: any = {};

  modalRef: BsModalRef;
  backClick: boolean;
  pago: any = {};
  tiposTarjetas: any = [];
  cuentas: any = [];
  registroPagos: any = [];
  tabs: any = [];
  tabContent: string;
  carritoLleno: boolean;
  clientes: any = [];
  clienteConsultado: boolean;
  marcasTarjetas: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: FacturasProvider,
    private datosLocal: DatosLocalProvider,
    private datosUsuario: DatosUsuarioProvider) {
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
            clase: 'active treeview',
            hijos: {
                clientes: '',
                facturas: 'active',
                ingresos: ''
            }
        },
        egresos: {
            clase: 'treeview',
            hijos: {
                proveedores: '',
                compras: '',
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
  }

  ngOnInit() {
    this.marcasTarjetas = [
      {
        id: 1,
        nombre: 'Visa'
      }, {
        id: 2,
        nombre: 'Mastercard'
      }
    ];
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
    this.carritoLleno = false;
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
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
        X: /[02-9]/
    };
    this.guardando = true;
    this.facturando = false;
    this.service.getAllTipoDocumentos().subscribe(resp => {
      console.log('tipo documentos', resp.data);
      this.tipoDocumentos = resp.data;
    });
    this.consumidorfinal = false;
    this.factura = {
      factura_id: undefined,
      serie: 'S-00-001',
      local_id: this.datosLocal.datos.local_id,
      usuario_id: this.datosUsuario.datos.empleado_id,
      persona_id: '',
      tipo_documento: 0,
      documento: '',
      direccion: '',
      nombre: '',
      apellido: '',
      email: '',
      celular: '',
      convencional: '',
      opcional: '',
      cant_producto: 1,
      min: 0,
      productos: [],
      iva_cero: 0,
      iva_doce: 0,
      subtotal: 0,
      total_iva: 0,
      total: 0,
      pagos: []
    };
    this.service.getAllProductos().subscribe(resp => {
      console.log('productos', resp.data);
      this.productos = resp.data;
      this.producto = {
        id: this.productos[0].id,
        categoria_id: this.productos[0].categoria_id,
        nom_categoria: this.productos[0].nom_categoria,
        nombre: this.productos[0].nombre,
        unidad: this.productos[0].unidad,
        codigo: this.productos[0].codigo,
        descripcio: this.productos[0].descripcion,
        costo: this.productos[0].costo,
        cantidad: 0,
        pt: 0,
        desc: ''
      };
      this.service.getByLocalProducto({
        local_id: this.datosLocal.datos.local_id,
        producto_id: this.producto.id
      }).subscribe(res => {
        const local = JSON.parse(res['_body']);
        console.log('inventario producto', local);
        this.factura.min = local.data[0].cantidad * 1;
        this.producto.iva_id = local.data[0].iva_id;
        this.producto.iva = local.data[0].iva;
      });
    });
    this.service.getAllIvas().subscribe(resp => {
      console.log('ivas', resp.data);
      this.ivas = resp.data;
      this.factura.iva_id = this.ivas[0].id * 1;
      this.factura.iva = this.ivas[0].cantidad;
    });
    this.service.getAllFormasPago().subscribe(resp => {
      console.log('formas pago', resp.data);
      this.formasPago = resp.data;
    });
    this.service.getAllTiposTarjetas().subscribe(resp => {
      console.log('tipos tarjetas', resp.data);
      this.tiposTarjetas = resp.data;
    });
    this.service.getAllCuentas().subscribe(resp => {
      console.log('cuentas', resp.data);
      this.cuentas = resp.data;
    });
    this.pago = {
      cxc_id: 'NULL',
      forma_pago: 'NULL',
      tipo_pago: 'NULL',
      cuenta_id: 'NULL',
      aporte: 0,
      banco: 'NULL',
      tipo_tarjeta: 'NULL',
      referencia: 'NULL',
      celular: 'NULL',
      email: 'NULL'
    };
    this.carrito = [];
    this.registroPagos = [];
    this.service.getAllClientes().subscribe(resp => {
      console.log('clientes', resp.data);
      this.clientes = resp.data;
    });
    this.clienteConsultado = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  cancelar() {
    this.ngOnInit();
  }

  guardar(e) {
    e.preventDefault();
    this.guardando = true;
    this.factura.productos = this.carrito;
    this.factura.pagos = this.registroPagos;
    console.log('guardar', this.factura);
    this.service.insert(this.factura).subscribe(resp => {
      console.log('factura agregada', resp['_body']);
      if (resp['_body'] === 'false') {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
      } else {
        this.agregarPagos(resp['_body']);
      }
    });
  }

  agregarPagos(factura) {
    this.factura.factura_id = factura * 1;
    this.service.insertPagos(this.factura).subscribe(resp => {
      console.log('agregado BD pagos', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Factura S-000-001' + factura + 'agregada exitosamente'
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
      }
    });
  }

  cambioTipoDocumento(e) {
    console.log('cambio tipo documento', e);
    if (e.value === '4') {
      this.consumidorfinal = true;
      this.factura.tipo_documento = 4;
      this.factura.documento = '999999999999999';
      this.factura.nombre = 'Consumidor';
      this.factura.apellido = 'final',
      this.factura.email = 'consumidor@final.com',
      this.factura.celular = '0000000000';
    } else {
      this.consumidorfinal = false;
      this.factura.tipo_documento = e.value * 1;
      this.factura.documento = '';
      this.factura.nombre = '';
      this.factura.apellido = '',
      this.factura.email = '',
      this.factura.celular = '';
    }
  }

  nuevafactura() {
    this.facturando = true;
  }

  eliminarProducto(e) {
    console.log('carrito', this.carrito);
    if (this.carrito.length < 1) {
      this.carritoLleno = false;
    } else {
      this.carritoLleno = false;
    }
  }

  agregarCarrito() {
    this.producto.cantidad = this.factura.cant_producto * 1;
    const pt = this.factura.cant_producto * this.producto.costo * 1;
    const iva = this.producto.cantidad * this.producto.iva / 100;
    if (this.factura.min > 0) {
      this.producto.pt = pt.toFixed(2);
      this.producto.total_iva = iva;
      this.carrito.push(this.producto);
      console.log('agregado', this.producto);
      this.calcularSubTotal();
      this.service.getByLocalProducto({
        local_id: this.datosLocal.datos.local_id,
        producto_id: this.producto.id
      }).subscribe(res => {
        const local = JSON.parse(res['_body']);
        console.log('inventario producto', local);
        for (let i = 0; i < local.data.length; i++) {
          for (let j = 0; j < this.carrito.length; j++) {
            if (local.data[i].codigo === this.carrito[j].codigo) {
              const valor = local.data[i].cantidad * 1;
              const resto = this.carrito[j].cantidad * 1;
              local.data[i].cantidad = valor - resto;
            }
          }
        }
        this.factura.min = local.data[0].cantidad * 1;
        this.factura.cant_producto = 0;
      });
    }
  }

  documentoChanged(e) {
    console.log('documento cambia', e);
    this.service.getByTipoDocumento({
      tipo_documento: this.factura.tipo_documento,
      num_documento: e.value}).subscribe(resp => {
        const data = JSON.parse(resp['_body']);
        console.log('cliente consultado', data);
        if (data.data.length > 0) {
          this.factura.persona_id = data.data[0].id;
          this.factura.documento = data.data[0].num_documento;
          this.factura.nombre = data.data[0].nombre;
          this.factura.apellido = data.data[0].apellido;
          this.factura.email = data.data[0].email;
          this.factura.celular = data.data[0].celular;
          this.factura.direccion  = data.data[0].direccion;
          this.factura.convencional  = data.data[0].convencional;
          this.factura.opcional  = data.data[0].opcional;
          this.clienteConsultado = true;
        } else {
          this.factura.persona_id = 0;
          this.factura.nombre = '';
          this.factura.apellido = '';
          this.factura.email = '';
          this.factura.celular = '';
          this.factura.direccion  = '';
          this.factura.convencional  = '';
          this.factura.opcional  = '';
          this.clienteConsultado = false;
        }
    });
  }

  cambioProducto(e) {
    console.log('cambio producto', e);
    this.factura.cant_producto = 0;
    this.service.getproductoById({id: e.value}).subscribe(resp => {
      const datos = JSON.parse(resp['_body']);
      console.log('producto', datos.data);
      this.producto = {
        id: datos.data[0].id,
        categoria_id: datos.data[0].categoria_id,
        nom_categoria: datos.data[0].nom_categoria,
        nombre: datos.data[0].nombre,
        unidad: datos.data[0].unidad,
        codigo: datos.data[0].codigo,
        descripcio: datos.data[0].descripcion,
        costo: datos.data[0].costo,
        cantidad: 0,
        pt: 0
      };
      this.service.getByLocalProducto({
        local_id: this.datosLocal.datos.local_id,
        producto_id: this.producto.id
      }).subscribe(res => {
        const local = JSON.parse(res['_body']);
        console.log('inventario producto', local);
        for (let i = 0; i < this.carrito.length; i++) {
          if (this.carrito[i].codigo === this.producto.codigo) {
            const cantidad = local.data[0].cantidad * 1;
            console.log('cantidad local', cantidad);
            const resto = this.carrito[i].cantidad;
            console.log('cantidad carrito', resto);
            this.factura.min = cantidad - resto;
            console.log('cantidad max', this.factura.min);
          }
        }
        this.producto.iva_id = local.data[0].iva_id;
        this.producto.iva = local.data[0].iva;
      });
    });
  }

  cambioIva(e) {
    console.log('cambio iva', e);
    const codigo = e.value * 1;
    this.service.getIvaById({id: codigo}).subscribe(resp => {
      const data = JSON.parse(resp['_body']);
      console.log('iva consultado', data);
      if (data) {
        this.factura.iva_id = data.id * 1;
        this.factura.iva = data.cantidad * 1;
        this.calcularSubTotal();
      }
    });
  }

  displayProductos(item) {
    if (!item) {
      return '';
    }
    return 'Código: ' + item.codigo +
            ' Nombre: ' + item.nombre + ' Precio: $' + item.costo;
  }

  displayIvas(item) {
    if (!item) {
      return '';
    }
    return item.nombre + ' - ' + item.cantidad + '%';
  }

  customizeSum(data) {
    return 'Sub-total: $' + data.value.toFixed(2);
  }

  calcularSubTotal() {
    let total = 0;
    if (this.carrito.length > 0) {
      for (let i = 0; i < this.carrito.length; i++) {
        total = total + this.carrito[i].pt * 1;
      }
    }
    this.factura.subtotal = total * 1;
    this.calcularCostoIva(total);
    console.log('calcula subtotal', total);
  }

  calcularCostoIva(subtotal) {
    let costoIva = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].total_iva > 0) {
        costoIva = costoIva + this.carrito[i].total_iva;
      }
    }
    this.factura.total_iva = costoIva;
    console.log('cálculo costo iva', costoIva);
    this.calcularTotal(costoIva, subtotal);
  }

  calcularTotal(iva, subtotal) {
    const i = iva * 1;
    const sub = subtotal * 1;
    this.factura.total = (i + sub).toFixed(2);
    this.factura.total = this.factura.total * 1;
  }

  cambioFormaPago(e) {
    const formaId = e.value * 1;
    this.service.getFormasPagoById({id: formaId}).subscribe(resp => {
      const forma = JSON.parse(resp['_body']);
      this.formaPago = forma.data[0];
      console.log('forma pago', this.formaPago);
      this.pago.tipo_pago = this.formaPago.nombre;
    });
    this.pago.forma_pago = e.value * 1;
  }

  cambioTipoTarjeta(e) {
    this.pago.tipo_tarjeta = e.value * 1;
  }

  cambioCuenta(e) {
    this.pago.cuenta_id = e.value * 1;
  }

  eliminarPago(e) {
    console.log('eliminar pago', e);
    console.log('registroPago', this.registroPagos);
    if (this.registroPagos.length > 0) {
      let paga = 0;
      let neto = 0;
      for (let i = 0; i < this.registroPagos.length; i++) {
        paga = paga + this.registroPagos[i].aporte * 1;
      }
      this.factura.cancela = paga;
      neto = this.factura.total * 1;
      this.factura.vuelto =  (this.factura.cancela - neto).toFixed(2);
      if (this.factura.cancela >= neto) {
        this.guardando = false;
      } else {
        this.guardando = true;
      }
    } else {
      this.factura.cancela = 0;
      this.factura.vuelto = 0;
    }
  }

  agregarPago(e) {
    e.preventDefault();
    console.log('pago', this.pago);
    this.registroPagos.push(this.pago);
    this.pago = {
      cxc_id: 'NULL',
      cuenta_id: 'NULL',
      aporte: 0,
      vuelto: 0,
      banco: 'NULL',
      tipo_tarjeta: 'NULL',
      referencia: 'NULL',
      celular: 'NULL',
      email: 'NULL'
    };

    let paga = 0;
    let neto = 0;
    for (let i = 0; i < this.registroPagos.length; i++) {
      paga = paga + this.registroPagos[i].aporte * 1;
    }
    this.factura.cancela = paga;
    neto = this.factura.total * 1;
    this.factura.vuelto =  (this.factura.cancela - neto).toFixed(2);
    if (this.factura.cancela >= neto) {
      this.guardando = false;
    } else {
      this.guardando = true;
    }
    console.log('agrega pago tabla', this.registroPagos);
  }

  insertarPago(e) {
    console.log('insertar pago', e);
  }

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
  }

  siguiente(e) {
    e.preventDefault();
    console.log('fctura', this.factura);
    if (this.clienteConsultado === true) {
      this.service.updateCliente({
        nombre: this.factura.nombre,
        apellido: '---',
        tipo_documento: this.factura.tipo_documento,
        num_documento: this.factura.documento,
        direccion: this.factura.direccion,
        descripcion: this.factura.nombre,
        email: this.factura.email,
        celular: this.factura.celular,
        convencional: this.factura.convencional,
        opcional: this.factura.opcional,
        id: this.factura.persona_id
      }).subscribe(res => {
        console.log(res['_body']);
        if (res['_body'] !== 'true') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error al conectarse con la BD, por favor contacte al administrador del sistema'
            }
          );
        }
      });
    } else {
      this.service.insertCliente({
        empresa_id: 1,
        nombre: this.factura.nombre,
        apellido: '---',
        tipo_documento: this.factura.tipo_documento,
        num_documento: this.factura.documento,
        direccion: this.factura.direccion,
        descripcion: this.factura.nombre,
        email: this.factura.email,
        convencional: this.factura.convencional,
        celular: this.factura.celular,
        opcional: this.factura.opcional
      }).subscribe(res => {
        console.log('cliente agregado', res['_body']);
        if (res['_body'] !== 'true') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error al conectarse con la BD, por favor contacte al administrador del sistema'
            }
          );
        } else {
          this.service.getByTipoDocumento({
            tipo_documento: this.factura.tipo_documento,
            num_documento: this.factura.documento}).subscribe(r => {
              const datos = JSON.parse(r['_body']);
              console.log('cliente consultado', datos);
              if (datos.data.length > 0) {
                this.factura.persona_id = datos.data[0].id;
              }
          });
        }
      });
    }
    this.tabContent = 'Pago';
  }

  atras() {
    this.tabContent = 'Pedido';
  }

  cambioFecha(e) {
    console.log('cambio fecha', e);
  }

}
