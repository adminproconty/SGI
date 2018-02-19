import { Component, TemplateRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavegationProvider } from '../../navegation/navegation.provider';
import { IngresosProvider } from './ingresos.provider';
import { DatosEmpresaProvider } from './../../providers/datos.empresa.provider';

@Component({
  selector: 'app-ingresos',
  templateUrl: 'ingresos.component.html',
  styleUrls: ['ingresos.component.css']
})

export class IngresosComponent implements OnInit {
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
  cuentas: any = [];
  tabs: any = [];
  tabContent: string;
  ingresoDirecto: any = [];
  transferencias: any = [];
  tarjetas: any = [];
  cheques: any = [];
  ingresos: any = {};
  alerts: any = [];

  constructor(
    private navegation: NavegationProvider,
    private service: IngresosProvider,
    private datepipe: DatePipe,
    private datosEmpresa: DatosEmpresaProvider) {
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
                facturas: '',
                ingresos: 'active'
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
    this.service.getAllCuentas().subscribe(resp => {
      console.log('cuentas', resp.data);
      this.cuentas = resp.data;
    });
    this.tabs = [
      {
        id: 0,
        text: 'Ingreso directo',
        icon: 'fa fa-money',
        content: 'Ingreso directo'
      }, {
        id: 1,
        text: 'Transferencia',
        icon: 'fa fa-exchange',
        content: 'Transferencia'
      }, {
        id: 2,
        text: 'Cheque',
        icon: 'fa fa-money',
        content: 'Cheque'
      }, {
        id: 3,
        text: 'Tarjeta',
        icon: 'fa fa-credit-card',
        content: 'Tarjeta'
      }, {
        id: 4,
        text: 'CXC',
        icon: 'fa fa-calendar',
        content: 'CXC'
      }
    ];
    this.tabContent = this.tabs[0].content;
    this.tarjetas = [
      {
        id: 0,
        tipo: 'Mastercard',
        numero: 12345,
        banco: 'Banco del Pichincha'
      }, {
        id: 1,
        tipo: 'Visa',
        numero: 12345678,
        banco: 'Produbanco'
      }
    ];
    this.ingresos = {
      empresa_id: this.datosEmpresa.datos.id,
      fecha: '',
      recibo: '',
      cuenta_id: '',
      descripcion: '',
      referencia: '',
      documento: '',
      total: 0.0,
      tipo_ingreso: '',
      ingresos: []
    };
  }

  guardar(e) {
    e.preventDefault();
    console.log('a guardar', this.ingresos);
    this.service.insert(this.ingresos).subscribe(resp => {
      console.log('ingresos guardado', resp['_body']);
      if (resp['_body'] === 'false') {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
      } else {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Guardado exitoso'
          }
        );
        this.ngOnInit();
      }
    });
  }

  cancelar() {}

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
    this.ingresos.tipo_ingresos = this.tabs[e.itemIndex].content;
  }

  editarIngresoDirecto(e) {
    console.log('editar', e);
  }

  eliminarIngresoDirecto(e) {
    console.log('eliminar', e);
  }

  editarTransferencia(e) {
    console.log('editar', e);
  }

  eliminarTransferencia(e) {
    console.log('eliminar', e);
  }

  editarCheque(e) {
    console.log('editar', e);
  }

  eliminarCheque(e) {
    console.log('eliminar', e);
  }

  cambioFecha(e) {
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.ingresos.fecha = this.datepipe.transform(newDate, 'yyyy-MM-dd');
    console.log('cambio fecha', this.ingresos.fecha);
  }

  cambioCuenta(e) {
    console.log('cambio cuenta', e);
    this.ingresos.cuenta_id = e.value * 1;
  }

}
