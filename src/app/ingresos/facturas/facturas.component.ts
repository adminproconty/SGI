import { Component, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';

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
  factura: any = [];
  phonePattern: any;
  phoneRules: any;
  carrito: any = [];

  constructor(
    private navegation: NavegationProvider) {
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
  }

  guardar(e) {
    e.preventDefault();
    this.guardando = true;
  }

  cambioTipoDocumento(e) {
  }

  nuevafactura() {
    this.facturando = true;
  }

  eliminarProducto(e) {

  }

  agregarCarrito() {
    this.carrito.push({
      codigo: '11111',
      nombre: 'Producto nombre',
      cantidad: 2,
      pu: 1.2,
      pt: 2.4
    });
  }

}
