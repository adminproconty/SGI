import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { ClientesProvider } from './clientes.provider';

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
  alerts: any = [];
  cliente: any = {};
  guardando: boolean;

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: ClientesProvider) {
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
      console.log('tipo documentos', resp.data);
      this.tipoDocumentos = resp.data;
      for (let i = 0; i < this.tipoDocumentos.length; i++) {
        if (this.tipoDocumentos[i].nombre === 'Consumidor final') {
          const index = this.tipoDocumentos.indexOf(this.tipoDocumentos[i]);
          this.tipoDocumentos.splice(index, 1);
        }
      }
    });
    this.guardando = false;
    this.cliente = {
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
    this.service.getAllClientes().subscribe(resp => {
      console.log('clientes', resp.data);
      this.clientes = resp.data;
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
    const cel = this.cliente.celular.split('(')[1];
    const celCod = cel.split(')')[0];
    const celPostCod = cel.split(')')[1];
    this.cliente.celular = celCod + celPostCod;
    const tlf = this.cliente.convencional.split('(')[1];
    const tlfCod = tlf.split(')')[0];
    const tlfPostCod = tlf.split(')')[1];
    this.cliente.convencional = tlfCod + tlfPostCod;
    console.log('a guardar', this.cliente);
    this.insertarPersona();
  }

  insertarPersona() {
    this.service.insertPersona(this.cliente).subscribe(resp => {
      console.log('insertar persona', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Cliente agregado exitosamente'
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
      this.guardando = false;
    });
  }

  cancelar() {
    this.modalRef.hide();
  }

  editar(e) {
    console.log('arreglomod', e);
    const clienteModif = {
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      apellido: e.newData.apellido !== undefined ? e.newData.apellido : e.oldData.apellido,
      tipo_documento: e.newData.tipo_documento !== undefined ? e.newData.tipo_documento : e.oldData.tipo_documento,
      num_documento: e.newData.num_documento !== undefined ? e.newData.num_documento : e.oldData.num_documento,
      direccion: e.newData.direccion !== undefined ? e.newData.direccion : e.oldData.direccion,
      descripcion: e.newData.descripcion !== undefined ? e.newData.descripcion : e.oldData.descripcion,
      email: e.newData.email !== undefined ? e.newData.email : e.oldData.email,
      convencional: e.newData.convencional !== undefined ? e.newData.convencional : e.oldData.convencional,
      celular: e.newData.celular !== undefined ? e.newData.celular : e.oldData.celular,
      opcional: e.newData.opcional !== undefined ? e.newData.opcional : e.oldData.opcional,
      id: e.oldData.id
    };
    clienteModif.id = clienteModif.id * 1;
    clienteModif.tipo_documento = clienteModif.tipo_documento * 1;
    console.log('cliente a editar', clienteModif);
    this.service.updatePersona(clienteModif).subscribe(resp => {
      console.log('modificación', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Cliente modificado exitosamente'
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
    this.cliente.tipo_documento = tipo;
  }

}
