import { Component, TemplateRef, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { RolesProvider } from './roles.provider';

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.css']
})
export class RolesComponent implements OnInit {
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
  arbolPermisos: any = [];
  selectedRowKeys: any[] = [];
  nuevo: any = {};
  alerts: any = [];
  roles: any = [];

  constructor(
    private navegation: NavegationProvider,
    private service: RolesProvider) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'active treeview',
            hijos: {
                empresa: '',
                locales: '',
                cuentas: '',
                iva: '',
                roles: 'active',
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
    this.service.all().subscribe(resp => {
      console.log('roles', resp.data);
      this.roles = resp.data;
    });
    this.arbolPermisos = [
        {
            ID: 1,
            Head_ID: 0,
            Full_Name: 'Administrador'
        }, {
            ID: 2,
            Head_ID: 1,
            Full_Name: 'Empresa'
        }
    ];
    this.nuevo = {
      nombre: '',
    descripcion: ''
    };
  }

  guardar(e) {
    e.preventDefault();
    const aGuardar = {
      empresa_id: 1,
      nombre: this.nuevo.nombre,
      descripcion: this.nuevo.descripcion
    };
    console.log('a guardar', aGuardar);
    this.service.insert(aGuardar).subscribe(resp => {
      console.log('guardado', resp);
      if (resp['_body'] === 'true') {
        this.ngOnInit();
        this.alerts.push(
          {
            type: 'success',
            msg: 'Guardado exitoso'
          }
        );
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

  cancelar() {}

  editar(e) {
    const aEditar = {
      id: e.oldData.id,
      nombre: '',
      descripcion: ''
    };
    if (e.newData.nombre) {
      aEditar.nombre = e.newData.nombre;
    } else {
      aEditar.nombre = e.oldData.nombre;
    }
    if (e.newData.descripcion) {
      aEditar.descripcion = e.newData.descripcion;
    } else {
      aEditar.descripcion = e.oldData.descripcion;
    }
    console.log('a editar', aEditar);
    this.service.update(aEditar).subscribe(resp => {
      console.log('editar', resp['_body']);
      if (resp['_body'] === 'true') {
        this.ngOnInit();
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
          }
        );
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

  eliminar(e) {
    console.log('eliminar', e);
  }

}
