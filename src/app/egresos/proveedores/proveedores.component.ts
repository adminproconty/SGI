import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { ProveedoresProvider } from './proveedores.provider';

@Component({
  selector: 'app-proveedores',
  templateUrl: 'proveedores.component.html',
  styleUrls: ['proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {
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
  proveedores: any = [];

  modalRef: BsModalRef;
  backClick: boolean;
  tipoDocumentos: any = [];
  phonePattern: any;
  phoneRules: any;
  proveedor: any = {
    empresa_id: 1,
    RUC: '',
    nombre: '',
    direccion: '',
    email: '',
    convencional: '',
    celular: '',
    opcional: '',
    credito: '',
    web: '',
    contacto: '',
    nota_pedido: 0,
    parte_relacionada: 0,
    automatico: 0
  };
  guardando: boolean;
  alerts: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: ProveedoresProvider) {
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
                proveedores: 'active',
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
    this.service.all().subscribe(resp => {
      console.log('proveedores', resp.data);
      this.proveedores = resp.data;
    });
    this.proveedor.empresa_id = 1;
    this.proveedor.RUC = '';
    this.proveedor.nombre = '';
    this.proveedor.direccion = '';
    this.proveedor.email = '';
    this.proveedor.convencional = '';
    this.proveedor.celular = '';
    this.proveedor.opcional = '';
    this.proveedor.credito = '';
    this.proveedor.web = '';
    this.proveedor.contacto = '';
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
    console.log('a guardar', this.proveedor);
    if (this.proveedor.correo === '') {
      this.proveedor.correo = 'NULL';
    }
    if (this.proveedor.convencional === '') {
      this.proveedor.convencional = 'NULL';
    }
    if (this.proveedor.celular === '') {
      this.proveedor.celular = 'NULL';
    }
    if (this.proveedor.opcional === '') {
      this.proveedor.opcional = 'NULL';
    }
    this.service.insert(this.proveedor).subscribe(resp => {
      console.log('insert', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Proveedor agregado exitosamente'
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
        this.ngOnInit();
        this.cancelar();
      }
    });
  }

  cancelar() {
    this.modalRef.hide();
  }

  editar(e) {
    console.log('editar', e);
    const proveedorModif = {
      id: e.oldData.id,
      RUC: e.newData.RUC !== undefined ? e.newData.RUC : e.oldData.RUC,
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      direccion: e.newData.direccion !== undefined ? e.newData.direccion : e.oldData.direccion,
      email: e.newData.email !== undefined ? e.newData.email : e.oldData.email,
      convencional: e.newData.convencional !== undefined ? e.newData.convencional : e.oldData.convencional,
      celular: e.newData.celular !== undefined ? e.newData.celular : e.oldData.celular,
      opcional: e.newData.opcional !== undefined ? e.newData.opcional : e.oldData.opcional,
      credito: e.newData.credito !== undefined ? e.newData.credito : e.oldData.credito,
      web: e.newData.web !== undefined ? e.newData.web : e.oldData.web,
      contacto: e.newData.contacto !== undefined ? e.newData.contacto : e.oldData.contacto,
      nota_pedido: e.newData.nota_pedido !== undefined ? e.newData.nota_pedido : e.oldData.nota_pedido,
      parte_relacionada: e.newData.parte_relacionada !== undefined ? e.newData.parte_relacionada : e.oldData.parte_relacionada,
      automatico: e.newData.automatico !== undefined ? e.newData.automatico : e.oldData.automatico
    };

    if (proveedorModif.nota_pedido === true) {
      proveedorModif.nota_pedido = 1;
    } else {
      proveedorModif.nota_pedido = 0;
    }
    if (proveedorModif.parte_relacionada === true) {
      proveedorModif.parte_relacionada = 1;
    } else {
      proveedorModif.parte_relacionada = 0;
    }
    if (proveedorModif.automatico === true) {
      proveedorModif.automatico = 1;
    } else {
      proveedorModif.automatico = 0;
    }
    this.service.update(proveedorModif).subscribe(resp => {
      console.log('update', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
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
    });
  }

  cambioTipoDocumento(e) {
    const id = e.value * 1;
    console.log('cambio tipo documento', e);
    this.proveedor.tipo_documento_id = id;
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

  cambioNotaPedido(e) {
    if (e.value === true) {
      this.proveedor.nota_pedido = 1;
    } else {
      this.proveedor.nota_pedido = 0;
    }
  }

  cambioParteRelacionada(e) {
    if (e.value === true) {
      this.proveedor.parte_relacionada = 1;
    } else {
      this.proveedor.parte_relacionada = 0;
    }
  }

  cambioAutomatico(e) {
    if (e.value === true) {
      this.proveedor.automatico = 1;
    } else {
      this.proveedor.automatico = 0;
    }
  }

}
