import { Component, TemplateRef, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';

@Component({
  selector: 'app-egresos',
  templateUrl: 'egresos.component.html',
  styleUrls: ['egresos.component.css']
})

export class EgresosComponent implements OnInit {
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
  egresosDirecto: any = [];
  transferencias: any = [];
  tarjetas: any = [];
  cheques: any = [];
  alerts: any = [];

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
                compras: '',
                egresos: 'active'
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
        text: 'Egreso directo',
        icon: 'fa fa-money',
        content: 'Egreso directo'
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
      }, {
        id: 1,
        tipo: 'Visa Debit',
        numero: 12345678,
        banco: 'Banco Guayaquil'
      }
    ];
  }

  guardar(e) {
    e.preventDefault();
    this.alerts.push(
      {
        type: 'success',
        msg: 'Egreso Guardado exitoso'
      }
    );
    this.ngOnInit();
  }

  cancelar() {}

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
  }

  editarEgresoDirecto(e) {
    console.log('editar', e);
  }

  eliminarEgresoDirecto(e) {
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

}
