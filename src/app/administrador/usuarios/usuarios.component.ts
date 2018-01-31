import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { UsuariosProvider } from './usuarios.provider';

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
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
  usuarios: any = [];

  modalRef: BsModalRef;
  backClick: boolean;
  phonePattern: any;
  phoneRules: any;
  tipoDocumentos: any = [];
  nuevo: any = {};
  alerts: any = [];
  guardando: boolean;

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: UsuariosProvider) {
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
                usuarios: 'active',
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
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
        X: /[02-9]/
    };
    this.service.getAllTipoDocumento().subscribe(resp => {
      console.log('tipos documentos', resp.data);
      this.tipoDocumentos = resp.data;
    });
    this.nuevo = {
      empresa_id: 1,
      nombre: '',
      apellido: '',
      tipo_documento: 0,
      num_documento: '',
      email: '',
      celular: ''
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
    const cel = this.nuevo.celular.split('(')[1];
    const celCod = cel.split(')')[0];
    const celPostCod = cel.split(')')[1];
    this.nuevo.celular = celCod + celPostCod;
    console.log('a guardar', this.nuevo);
    this.insertarPersona();
  }

  insertarPersona() {
    this.service.insertPersona(this.nuevo).subscribe(resp => {
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
    this.service.getPersonaInsertada(this.nuevo).subscribe(resp => {
      resp['_body'] = JSON.parse(resp['_body']);
      console.log('consultar persona insertada', resp);
      this.insertarUsuario(resp['_body'].data[0].id);
    });
  }

  insertarUsuario(id) {
    const usuarioAgregar = {
      persona_id: id,
      clave: '12345'
    };
    this.service.insertUsuario(usuarioAgregar).subscribe(resp => {
      console.log('insertar usuario', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Usuario agregado exitosamente'
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
    this.nuevo.tipo_documento = tipo;
  }

}
