import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { IvaProvider } from './iva.provider';

@Component({
  selector: 'app-iva',
  templateUrl: 'iva.component.html',
  styleUrls: ['iva.component.css']
})
export class IvaComponent implements OnInit {
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
  nuevo: any = {};
  alerts: any = [];
  guardando: boolean;
  ivas: any = [];
  estado: boolean;

  constructor(
      private navegation: NavegationProvider,
      private modalService: BsModalService,
      private service: IvaProvider) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'active treeview',
            hijos: {
                empresa: '',
                locales: '',
                cuentas: '',
                iva: 'active',
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
    this.backClick = false;
    this.nuevo = {
      nombre: undefined,
      valor: undefined,
      estado: 1
    };
    this.guardando = false;
    this.service.all().subscribe(resp => {
      this.ivas = resp.data;
      console.log('todos los ivas', resp.data);
    });
    this.estado = true;
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
    const valoresGuardar = {
      empresa_id: 1,
      nombre: this.nuevo.nombre,
      cantidad: this.nuevo.valor,
      estado: this.nuevo.estado
    };
    console.log('a guardar', valoresGuardar);
    this.service.insert(valoresGuardar).subscribe(resp => {
      console.log('guardado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Guardado exitoso'
          }
        );
        this.ngOnInit();
        this.cancelar();
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

  editar(e) {
    console.log('editar', e);
    const valoresModificar = {
      id: e.oldData.id * 1,
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      cantidad: e.newData.cantidad !== undefined ? e.newData.cantidad : e.oldData.cantidad,
      estado: e.newData.estado !== undefined ? e.newData.estado : e.oldData.estado
    };
    if (valoresModificar.estado === true) {
      valoresModificar.estado = 1;
    } else {
      valoresModificar.estado = 0;
    }
    valoresModificar.cantidad = valoresModificar.cantidad * 1;
    console.log('a guardar', valoresModificar);
    this.service.update(valoresModificar).subscribe(resp => {
      console.log('modificado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitoso'
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

  eliminar(e) {
    console.log('eliminar', e);
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

  cambioEstado(e) {
    if (e.value === true) {
      this.nuevo.estado = 1;
    } else {
      this.nuevo.estado = 0;
    }
  }

}
