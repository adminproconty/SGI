import { DatosEmpresaProvider } from './../../providers/datos.empresa.provider';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { LocalesProvider } from './locales.provider';

@Component({
  selector: 'app-locales',
  templateUrl: 'locales.component.html',
  styleUrls: ['locales.component.css']
})
export class LocalesComponent implements OnInit {
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
  phonePattern: any;
  phoneRules: any;
  backClick: boolean;
  nuevo: any = {
    nombre: undefined,
    direccion: undefined,
    email: undefined,
    telefono: undefined,
    celular: undefined
  };
  guardando: boolean;
  alerts: any = [];
  locales: any = [];

  constructor(
      private navegation: NavegationProvider,
      private modalService: BsModalService,
      private service: LocalesProvider,
      private datosEmpresa: DatosEmpresaProvider) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'active treeview',
            hijos: {
                empresa: '',
                locales: 'active',
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
    this.cancelAllChanges = '  Cancelar  ';
    this.cancelRowChanges = '  Cancelar  ';
    this.confirmDeleteMessage = 'Todos los registros a este local serán borrados también, ¿está seguro?';
    this.deleteRow = '  Eliminar  ';
    this.editRow = '  Editar  ';
    this.saveAllChanges = '  Guardar  ';
    this.saveRowChanges = '  Guardar  ';
    this.undeleteRow = '  No eliminar  ';
    this.validationCancelChanges = '  Cancelar  ';
    this.phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
    this.phoneRules = {
      X: /[02-9]/
    };
    this.backClick = false;
    this.guardando = false;
    this.service.all().subscribe(resp => {
      if (resp.data.length > 0) {
        this.locales = resp.data;
      } else {
        this.locales = [];
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar(e) {
    console.log('guardar', e);
    e.preventDefault();
    this.nuevo.empresa_id = this.datosEmpresa.datos.id;
    if (this.nuevo.nombre !== '' && this.nuevo.direccion !== '' &&
        this.nuevo.telefono !== '' && this.nuevo.celular !== '') {
          const tel = this.nuevo.telefono.split('(')[1];
          const telCod = tel.split(')')[0];
          const telPostCod = tel.split(')')[1];
          this.nuevo.telefono = telCod + '' + telPostCod;
          const cel = this.nuevo.celular.split('(')[1];
          const celCod = cel.split(')')[0];
          const celPostCod = cel.split(')')[1];
          this.nuevo.celular = celCod + '' + celPostCod;
          this.guardando = true;
          this.service.insert(this.nuevo).subscribe(resp => {
            console.log('insert', resp['_body']);
            this.guardando = false;
            if (resp['_body'] === 'true') {
              this.alerts.push(
                {
                  type: 'success',
                  msg: 'Guardado exitoso'
                }
              );
            } else {
              this.alerts.push(
                {
                  type: 'danger',
                  msg: 'Error, por favor contacte al administrador del sistema'
                }
              );
            }
            this.cancelar();
            this.service.all().subscribe(respuesta => {
              this.locales = respuesta.data;
            });
          });
    }
  }

  cancelar() {
    this.modalRef.hide();
  }

  editar(e) {
    const enviar = {
      id: 0,
      nombre: '',
      direccion: '',
      email: '',
      telefono: '',
      celular: ''
    };
    enviar.id = e.oldData.id * 1;
    if (e.newData.nombre) {
      enviar.nombre = e.newData.nombre;
    } else {
      enviar.nombre = e.oldData.nombre;
    }

    if (e.newData.direccion) {
      enviar.direccion = e.newData.direccion;
    } else {
      enviar.direccion = e.oldData.direccion;
    }

    if (e.newData.email) {
      enviar.email = e.newData.email;
    } else {
      enviar.email = e.oldData.email;
    }

    if (e.newData.telefono) {
      enviar.telefono = e.newData.telefono;
    } else {
      enviar.telefono = e.oldData.telefono;
    }

    if (e.newData.celular) {
      enviar.celular = e.newData.celular;
    } else {
      enviar.celular = e.oldData.celular;
    }

    console.log('enviar', enviar);

    this.service.update(enviar).subscribe(resp => {
      console.log('editar', resp);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificación exitosa'
          }
        );
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
