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
  locales: any = [];
  empleado: false;
  usuarioLocal: any = [];
  localUsuario: any = {};

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
    this.nuevo = {
      empresa_id: 1,
      nombre: '',
      apellido: '',
      tipo_documento: 0,
      num_documento: '',
      email: '',
      direccion: '',
      convencional: '',
      celular: '',
      opcional: '',
      locales: [],
      empleado: 0
    };
    this.guardando = false;
    this.service.all().subscribe(resp => {
      console.log('usuarios', resp.data);
      this.usuarios = resp.data;
      this.localUsuario = {
        empleado_id: this.usuarios[0].id,
        locales: []
      };
    });
    this.service.getAllLocales().subscribe(resp => {
      console.log('locales', resp.data);
      this.locales = resp.data;
    });
    this.service.getAllLocalUsuario().subscribe(resp => {
      console.log('usuario local', resp.data);
      this.usuarioLocal = resp.data;
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
    const cel = this.nuevo.celular.split('(')[1];
    const celCod = cel.split(')')[0];
    const celPostCod = cel.split(')')[1];
    this.nuevo.celular = celCod + celPostCod;
    const tlf = this.nuevo.convencional.split('(')[1];
    const tlfCod = tlf.split(')')[0];
    const tlfPostCod = tlf.split(')')[1];
    this.nuevo.convencional = tlfCod + tlfPostCod;
    if (this.nuevo.convencional === '') {
      this.nuevo.convencional = 'NULL';
    }
    if (this.nuevo.celular === '') {
      this.nuevo.celular = 'NULL';
    }
    if (this.nuevo.opcional === '') {
      this.nuevo.opcional = 'NULL';
    }
    console.log('a guardar', this.nuevo);
    this.insertarPersona();
  }

  insertarPersona() {
    this.nuevo.descripcion = '---';
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
      clave: '12345',
      empleado: this.nuevo.empleado
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
    console.log('arreglomod', e);
    const usuarioModif = {
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      apellido: e.newData.apellido !== undefined ? e.newData.apellido : e.oldData.apellido,
      tipo_documento: e.newData.tipo_documento !== undefined ? e.newData.tipo_documento : e.oldData.tipo_documento,
      direccion: e.newData.direccion !== undefined ? e.newData.direccion : e.oldData.direccion,
      descripcion: '---',
      num_documento: e.newData.num_documento !== undefined ? e.newData.num_documento : e.oldData.num_documento,
      email: e.newData.email !== undefined ? e.newData.email : e.oldData.email,
      convencional: e.newData.convencional !== undefined ? e.newData.convencional : e.oldData.convencional,
      celular: e.newData.celular !== undefined ? e.newData.celular : e.oldData.celular,
      opcional: e.newData.opcional !== undefined ? e.newData.opcional : e.oldData.opcional,
      empleado: e.newData.empleado !== undefined ? e.newData.empleado : e.oldData.empleado,
      clave: e.oldData.clave,
      persona_id: e.oldData.persona_id,
      id: e.oldData.id
    };
    if (usuarioModif.empleado === true) {
      usuarioModif.empleado = 1;
    } else {
      usuarioModif.empleado = 0;
    }
    usuarioModif.id = usuarioModif.id;
    usuarioModif.tipo_documento = usuarioModif.tipo_documento;
    console.log('usuario a editar', usuarioModif);
    this.service.updateUsuario(usuarioModif).subscribe(resp => {
      console.log('modificación', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Usuario modificado exitosamente'
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
    this.nuevo.tipo_documento = tipo;
  }

  changeLocal(e) {
    console.log('cambio local', e);
    if (e.value.length > 0) {
      const data = [];
      for (let i = 0; i < e.value.length; i++) {
        const valor = e.value[i] * 1;
        data.push(valor);
      }
      this.nuevo.locales = data;
      this.localUsuario.locales = data;
    }
  }

  cambioEmpleado(e) {
    if (e.value === true) {
      this.nuevo.empleado = 1;
    } else {
      this.nuevo.empleado = 0;
    }
  }

  eliminarLocalUsuario(e) {
    console.log('eliminar local_usuario', e);
    const idempleado = e.key * 1;
    this.service.deleteAsignacion({id: idempleado }).subscribe(resp => {
      console.log('eliminado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Eliminada exitosa'
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

  displayUsuarios(item) {
    if (!item) {
      return '';
    }
    return 'Nombre: ' + item.nombre + ' Apellido: ' + item.apellido + ' Nº Documento:  ' + item.num_documento;
  }

  cambioUsuario(e) {
    console.log('cambio usuario', e);
    this.localUsuario.empleado_id = e.value;
  }

  asignar(e) {
    e.preventDefault();
    console.log('asignar', this.localUsuario);
    this.service.asignarEmpleadoLocal(this.localUsuario).subscribe(resp => {
      console.log('asignado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Asignación exitosa'
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
      }
    });
  }

}
