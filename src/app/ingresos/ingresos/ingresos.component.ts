import { Component, TemplateRef, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';

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
  tipoDocumentos: any = [];
  cuentas: any = [];
  tabs: any = [];
  tabContent: string;
  ingresoDirecto: any = [];
  transferencias: any = [];
  tarjetas: any = [];

  constructor(private navegation: NavegationProvider) {
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
    this.tipoDocumentos = [
        {
            id: 1,
            nombre: 'Cédula de Identidad'
        }, {
            id: 2,
            nombre: 'R.U.C.'
        }, {
            id: 3,
            nombre: 'Pasaporte'
        }
    ];
    this.cuentas = [
      {
        id: 0,
        nombre: 'Produbanco'
      }, {
        id: 1,
        nombre: 'Paypal'
      }
    ];
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
  }

  guardar() {}

  cancelar() {}

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
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

}
