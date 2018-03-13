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
  proveedor: any = {};
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
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
        X: /[02-9]/
    };
    this.service.all().subscribe(resp => {
      console.log('proveedores', resp.data);
      this.proveedores = resp.data;
    });
    this.proveedor.empresa_id = 1;
    this.proveedor.documento = '';
    this.proveedor.nombre = '';
    this.proveedor.direccion = '';
    this.proveedor.email = '';
    this.proveedor.convencional = '';
    this.proveedor.celular = '';
    this.proveedor.opcional = '';
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
      tipo_documento_id: e.newData.tipo_documento_id !== undefined ? e.newData.tipo_documento_id : e.oldData.tipo_documento_id,
      documento: e.newData.documento !== undefined ? e.newData.documento : e.oldData.documento,
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      direccion: e.newData.direccion !== undefined ? e.newData.direccion : e.oldData.direccion,
      email: e.newData.email !== undefined ? e.newData.email : e.oldData.email,
      convencional: e.newData.convencional !== undefined ? e.newData.convencional : e.oldData.convencional,
      celular: e.newData.celular !== undefined ? e.newData.celular : e.oldData.celular,
      opcional: e.newData.opcional !== undefined ? e.newData.opcional : e.oldData.opcional
    };
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

}
