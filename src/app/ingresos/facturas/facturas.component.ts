import { Component, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { FacturasProvider } from './facturas.provider';

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

  constructor(
    private navegation: NavegationProvider,
    private service: FacturasProvider) {
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
    this.guardando = false;
    this.facturando = false;
    this.service.getAllTipoDocumentos().subscribe(resp => {
      console.log('tipo documentos', resp.data);
      this.tipoDocumentos = resp.data;
    });
    this.consumidorfinal = false;
    this.factura = {
      persona_id: undefined,
      tipo_documento: undefined,
      documento: undefined,
      nombre: undefined,
      apellido: undefined,
      email: undefined,
      celular: undefined,
      cant_producto: 1,
      productos: [],
      iva_id: undefined,
      iva: undefined,
      subtotal: undefined,
      total_iva: undefined,
      total_pagar: undefined
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
        pt: 0
      };
    });
    this.service.getAllIvas().subscribe(resp => {
      console.log('ivas', resp.data);
      this.ivas = resp.data;
      this.factura.iva_id = this.ivas[0].id;
      this.factura.iva = this.ivas[0].cantidad;
    });
  }

  guardar(e) {
    e.preventDefault();
    this.guardando = true;
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
      this.factura.documento = undefined;
      this.factura.nombre = undefined;
      this.factura.apellido = undefined,
      this.factura.email = undefined,
      this.factura.celular = undefined;
    }
  }

  nuevafactura() {
    this.facturando = true;
  }

  eliminarProducto(e) {
    console.log('carrito', this.carrito);
  }

  agregarCarrito() {
    this.producto.cantidad = this.factura.cant_producto * 1;
    const pt = this.factura.cant_producto * this.producto.costo * 1;
    this.producto.pt = pt.toFixed(2);
    this.carrito.push(this.producto);
    console.log('agregado', this.producto);
    this.calcularSubTotal();
  }

  documentoChanged(e) {
    console.log('documento cambia', e);
    this.service.getByTipoDocumento({
      tipo_documento: this.factura.tipo_documento,
      num_documento: e.value}).subscribe(resp => {
        const data = JSON.parse(resp['_body']);
        console.log('cliente consultado', data);
        this.factura.persona_id = data.data[0].id;
        this.factura.documento = data.data[0].num_documento;
        this.factura.nombre = data.data[0].nombre;
        this.factura.apellido = data.data[0].apellido;
        this.factura.email = data.data[0].email;
        this.factura.celular = data.data[0].celular;
    });
  }

  cambioProducto(e) {
    console.log('cambio producto', e);
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
    return item.codigo + ' - ' + item.nombre + ' $' + item.costo;
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
        total = total + this.carrito[i].pt;
      }
    }
    this.factura.subtotal = total * 1;
    this.calcularCostoIva(total);
    console.log('calcula subtotal', total);
  }

  calcularCostoIva(subtotal) {
    let costoIva;
    costoIva = subtotal * this.factura.iva / 100;
    this.factura.total_iva = costoIva.toFixed(2);
    console.log('cálculo costo iva', costoIva);
    this.calcularTotal(costoIva, subtotal);
  }

  calcularTotal(iva, subtotal) {
    const i = iva * 1;
    const sub = subtotal * 1;
    this.factura.total_pagar = (i + sub).toFixed(2);
  }

}
