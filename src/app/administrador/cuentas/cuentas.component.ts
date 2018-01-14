import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';

@Component({
  selector: 'app-cuentas',
  templateUrl: 'cuentas.component.html',
  styleUrls: ['cuentas.component.css']
})
export class CuentasComponent implements OnInit {
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

  cuentas: any = [];
  esBanco: boolean;
  esElectronica: boolean;
  verBanco: boolean;
  verElectronica: boolean;

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'active treeview',
            hijos: {
                empresa: '',
                locales: '',
                cuentas: 'active',
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
    this.backClick = false;
    this.esBanco = false;
    this.esElectronica = false;
    this.verElectronica = true;
    this.verBanco = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar() {
    this.backClick = true;
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

  cambio(e, tipo) {
    if (tipo == 'banco') {
      if (e.value == true) {
        this.esBanco = true;
        this.verElectronica = false;
      } else {
        this.esBanco = false;
        this.verElectronica = true;
      }
    } else {
      if (e.value == false) {
        this.esElectronica = false;
        this.verBanco = true;
      } else {
        this.esElectronica = true;
        this.verBanco = false;
      }
    }
  }

}
