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
      valor: undefined
    };
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
    const valoresGuardar = {
      empresa_id: 1,
      nombre: this.nuevo.nombre,
      cantidad: this.nuevo.valor
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
  }

  eliminar(e) {
    console.log('eliminar', e);
  }

}
