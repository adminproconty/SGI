import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { EmpleadosProvider } from './empleados.provider';

@Component({
  selector: 'app-empleados',
  templateUrl: 'empleados.component.html',
  styleUrls: ['empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
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
  empleados: any = [];
  alerts: any = [];

  modalRef: BsModalRef;
  backClick: boolean;
  phonePattern: any;
  phoneRules: any;
  empleado: any = [];
  tipoDocumentos: any = [];
  guardando: boolean;

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: EmpleadosProvider) {
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
                roles: '',
                usuarios: '',
                empleados: 'active'
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
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
        X: /[02-9]/
    };
    this.service.getAllTipoDocumento().subscribe(resp => {
      console.log('tipos documentos', resp.data);
      this.tipoDocumentos = resp.data;
    });
    this.guardando = false;
    this.empleado = {
      empresa_id: 1,
      nombre: '',
      apellido: '',
      tipo_documento: 0,
      num_documento: '',
      email: '',
      celular: ''
    };
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
    const cel = this.empleado.celular.split('(')[1];
    const celCod = cel.split(')')[0];
    const celPostCod = cel.split(')')[1];
    this.empleado.celular = celCod + celPostCod;
    console.log('a guardar', this.empleado);
    this.insertarPersona();
  }

  insertarPersona() {
    this.service.insertPersona(this.empleado).subscribe(resp => {
      console.log('insertar persona', resp['_body']);
      if (resp['_body'] === 'true') {
        this.consultarPersonaInsertada();
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

  consultarPersonaInsertada() {
    this.service.getPersonaInsertada(this.empleado).subscribe(resp => {
      resp['_body'] = JSON.parse(resp['_body']);
      console.log('consultar persona insertada', resp);
      this.insertarUsuario(resp['_body'].data[0].id);
    });
  }

  insertarUsuario(id) {
    const usuarioAgregar = {
      persona_id: id,
      clave: 'NULL'
    };
    this.service.insertUsuario(usuarioAgregar).subscribe(resp => {
      console.log('insertar empleado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Empleado agregado exitosamente'
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

  cambioTipoDocumento(e) {
    console.log('cambio tipo documento', e);
    const tipo = e.value * 1;
    this.empleado.tipo_documento = tipo;
  }

}
