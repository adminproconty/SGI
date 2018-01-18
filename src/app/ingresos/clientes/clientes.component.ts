import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.css']
})
export class ClientesComponent implements OnInit {
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
  clientes: any = [];

  modalRef: BsModalRef;
  backClick: boolean;
  phonePattern: any;
  phoneRules: any;

  tipoDocumentos: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService) {
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
                clientes: 'active',
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
    this.cancelAllChanges = 'Cancelar todos los cambios';
    this.cancelRowChanges = 'Cancelar cambios en la tupla';
    this.confirmDeleteMessage = 'Todos los registros a este local serán borrados también, ¿está seguro?';
    this.deleteRow = 'Eliminar';
    this.editRow = 'Editar';
    this.saveAllChanges = 'Guardar todos los cambios';
    this.saveRowChanges = 'Guardar los cambios de la tupla';
    this.undeleteRow = 'No eliminar';
    this.validationCancelChanges = 'Cancelar los cambios';
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
        X: /[02-9]/
    };
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
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar() {}

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
