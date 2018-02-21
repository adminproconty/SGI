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
    this.service.getAllTipoDocumento().subscribe(resp => {
      console.log('tipos documentos', resp.data);
      this.tipoDocumentos = resp.data;
      for (let i = 0; i < this.tipoDocumentos.length; i++) {
        if (this.tipoDocumentos[i].nombre === 'Consumidor final') {
          const index = this.tipoDocumentos.indexOf(this.tipoDocumentos[i]);
          this.tipoDocumentos.splice(index, 1);
        }
      }
    });
    this.guardando = false;
    this.empleado = {
      empresa_id: 1,
      nombre: '',
      apellido: '',
      tipo_documento: 0,
      num_documento: '',
      direccion: '',
      email: '',
      convencional: '',
      celular: '',
      opcional: ''
    };
    this.service.all().subscribe(resp => {
      console.log('empleados', resp.data);
      this.empleados = resp.data;
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
    this.guardando = true;
    const cel = this.empleado.celular.split('(')[1];
    const celCod = cel.split(')')[0];
    const celPostCod = cel.split(')')[1];
    this.empleado.celular = celCod + celPostCod;
    const tlf = this.empleado.convencional.split('(')[1];
    const tlfCod = tlf.split(')')[0];
    const tlfPostCod = tlf.split(')')[1];
    this.empleado.convencional = tlfCod + tlfPostCod;
    console.log('a guardar', this.empleado);
    this.insertarPersona();
  }

  insertarPersona() {
    this.empleado.descripcion = '---';
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
      clave: 'NULL',
      empleado: 1
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
    console.log('arreglomod', e);
    const empleadoModif = {
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      apellido: e.newData.apellido !== undefined ? e.newData.apellido : e.oldData.apellido,
      tipo_documento: e.newData.tipo_documento !== undefined ? e.newData.tipo_documento : e.oldData.tipo_documento,
      num_documento: e.newData.num_documento !== undefined ? e.newData.num_documento : e.oldData.num_documento,
      direccion: e.newData.direccion !== undefined ? e.newData.direccion : e.oldData.direccion,
      descripcion: '---',
      convencional: e.newData.convencional !== undefined ? e.newData.convencional : e.oldData.convencional,
      email: e.newData.email !== undefined ? e.newData.email : e.oldData.email,
      celular: e.newData.celular !== undefined ? e.newData.celular : e.oldData.celular,
      opcional: e.newData.opcional !== undefined ? e.newData.opcional : e.oldData.opcional,
      empleado: 1,
      clave: 'NULL',
      persona_id: e.oldData.persona_id,
      id: e.oldData.id
    };
    empleadoModif.id = empleadoModif.id * 1;
    empleadoModif.tipo_documento = empleadoModif.tipo_documento * 1;
    console.log('empleado a editar', empleadoModif);
    this.service.updateUsuario(empleadoModif).subscribe(resp => {
      console.log('modificación', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Empleado modificado exitosamente'
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

  cambioTipoDocumento(e) {
    console.log('cambio tipo documento', e);
    const tipo = e.value * 1;
    this.empleado.tipo_documento = tipo;
  }

}
