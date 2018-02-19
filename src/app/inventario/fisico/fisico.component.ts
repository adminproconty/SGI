import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { FisicoProvider } from './fisico.provider';

@Component({
  selector: 'app-fisico',
  templateUrl: 'fisico.component.html',
  styleUrls: ['fisico.component.css']
})

export class FisicoComponent implements OnInit {
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

  productos: any = [];
  alerts: any = [];
  guardando: boolean;
  locales: any = [];
  nuevo: any = {};
  inventario: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: FisicoProvider) {
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
            clase: 'active treeview',
            hijos: {
                productos: '',
                requision: '',
                fisico: 'active',
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

    this.guardando = false;
    this.nuevo = {
      local_id: 0,
      producto_id: 0,
      cantidad: 0,
      minimo_stock: 0
    };
    this.service.getAllLocales().subscribe(resp => {
      console.log('locales', resp.data);
      this.locales = resp.data;
    });
    this.service.getAllProductos().subscribe(resp => {
      console.log('productos', resp.data);
      this.productos = resp.data;
    });
    this.all();
  }

  all() {
    this.service.all().subscribe(resp => {
      console.log('all inventario', resp.data);
      this.inventario = resp.data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar(e) {
    e.preventDefault();
    this.service.insert(this.nuevo).subscribe(resp => {
      console.log('guardado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Inventario agregado'
          }
        );
        this.all();
      } else {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
        this.guardando = false;
      }
    });
  }

  cancelar() {
    this.modalRef.hide();
  }

  editarCantidad(e) {
    const editar = {
      id: e.oldData.id,
      cantidad: e.newData.cantidad !== undefined ? e.newData.cantidad : e.oldData.cantidad,
      minimo_stock: e.newData.minimo_stock !== undefined ? e.newData.minimo_stock : e.oldData.minimo_stock,
    };
    console.log('a modificar', editar);
    this.service.update(editar).subscribe(resp => {
      console.log('modificado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Inventario modificado exitosamente'
          }
        );
        this.all();
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

  eliminarCantidad(e) {
    console.log('eliminar cantidad', e);
    this.service.delete({
      id: e.key
    }).subscribe(resp => {
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Inventario eliminado exitosamente'
          }
        );
        this.all();
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

  cambioLocal(e) {
    console.log('cambio local', e);
    this.nuevo.local_id = e.value * 1;
    this.service.getByLocalProducto(this.nuevo).subscribe(resp => {
      const res = JSON.parse(resp['_body']);
      if (res.data.length > 0) {
        this.guardando = true;
      } else {
        this.guardando = false;
      }
    });
  }

  cambioProducto(e) {
    console.log('cambio producto', e);
    this.nuevo.producto_id = e.value * 1;
    this.service.getByLocalProducto(this.nuevo).subscribe(resp => {
      const res = JSON.parse(resp['_body']);
      if (res.data.length > 0) {
        this.guardando = true;
      } else {
        this.guardando = false;
      }
    });
  }

}
