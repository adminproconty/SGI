import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { CuentasProvider } from './cuentas.provider';

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
  tipoCuentas: any = [];
  nueva: any = {
    nombre: '',
    fuente: 0,
    numero: '',
    banco_id: 0,
    tipo: 0,
    saldo: 0.0,
    email: ''
  };
  guardando: boolean;
  alerts: any = [];
  detalle: any = {
    id: undefined,
    empresa_id: undefined,
    tipo_fuente: undefined,
    nombre: undefined,
    numero: undefined,
    banco: undefined,
    banco_id: undefined,
    tipo: undefined,
    bnco_tipo_cuenta: undefined,
    saldo: undefined,
    email: undefined
  };
  bancos: any = [];
  tarjeta: any = {};
  tipos_tarjetas: any = [];
  marcaTarjetas: any = [];
  tarjetas: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: CuentasProvider) {
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
    this.cancelAllChanges = 'Cancelar';
    this.cancelRowChanges = 'Cancelar';
    this.confirmDeleteMessage = 'Todos los registros a este local serán borrados también, ¿está seguro?';
    this.deleteRow = '';
    this.editRow = '';
    this.saveAllChanges = '';
    this.saveRowChanges = '';
    this.undeleteRow = 'No eliminar';
    this.validationCancelChanges = 'Cancelar';
    this.backClick = false;
    this.esBanco = false;
    this.esElectronica = false;
    this.verElectronica = true;
    this.verBanco = true;
    this.service.getAllTipoCuentas().subscribe(resp => {
      console.log('tipo cuentas', resp.data);
      this.tipoCuentas = resp.data;
    });
    this.guardando = false;
    this.service.all().subscribe(resp => {
      this.cuentas = resp.data;
      console.log('cuentas', resp.data);
    });
    this.service.getAllBancos().subscribe(resp => {
      console.log('bancos', resp.data);
      this.bancos = resp.data;
    });
    this.tarjeta = {
      nombre: '',
      numero: '',
      tipo_tarjeta_id: '',
      marca_tarjeta_id: '',
      cuenta_id: ''
    };
    this.service.getAllTiposTarjetas().subscribe(resp => {
      console.log('tipos trabajos', resp.data);
      this.tipos_tarjetas = resp.data;
    });
    this.service.getAllMarcasTarjetas().subscribe(resp => {
      console.log('marcas tarjetas', resp.data);
      this.marcaTarjetas = resp.data;
    });
    this.service.getAllTarjetas().subscribe(resp => {
      console.log('tarjetas', resp.data);
      this.tarjetas = resp.data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  openDetalle(template: TemplateRef<any>, detalles: any) {
    console.log('detalles cuenta', detalles);
    this.detalle = {
      id: detalles.data.id,
      empresa_id: detalles.data.empresa_id,
      tipo_fuente: detalles.data.tipo_fuente,
      nombre: detalles.data.nombre,
      numero: detalles.data.bnco_numero,
      banco: detalles.data.bnco_id,
      banco_id: detalles.data.bnco_id,
      tipo: detalles.data.bnco_tipo_cuenta,
      bnco_tipo_cuenta: detalles.data.bnco_tipo_cuenta,
      saldo: detalles.data.bnco_saldo_inicial,
      email: detalles.data.email
    };
    if (detalles.data.tipo_fuente === '2') {
      this.esElectronica = true;
      this.esBanco = false;
      this.detalle.tipo = 'NULL';
      this.detalle.saldo = 'NULL';
      console.log('cambio', this.detalle);
    } else if (detalles.data.tipo_fuente === '1') {
      this.esBanco = true;
      this.esElectronica = false;
    }
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardar(e) {
    e.preventDefault();
    const saldoInicial = this.nueva.saldo * 1;
    this.nueva.saldo = saldoInicial;
    let enviar = {};
    if (this.esElectronica === true) {
      enviar = {
        empresa_id: 1,
        nombre: this.nueva.nombre,
        tipo_fuente: this.nueva.fuente,
        bnco_numero: 'NULL',
        bnco_id: 'NULL',
        bnco_tipo_cuenta: 'NULL',
        bnco_saldo_inicial: 'NULL',
        email: this.nueva.email
      };
    } else if (this.esBanco === true) {
      enviar = {
        empresa_id: 1,
        nombre: this.nueva.nombre,
        tipo_fuente: this.nueva.fuente,
        bnco_numero: this.nueva.numero,
        bnco_id: this.nueva.banco_id,
        bnco_tipo_cuenta: this.nueva.tipo,
        bnco_saldo_inicial: this.nueva.saldo,
        email: this.nueva.email
      };
    }
    console.log('a guardar', enviar);
    this.guardando = true;
    this.service.insert(enviar).subscribe(resp => {
      console.log('insert', resp['_body']);
      if (resp['_body'] === 'true') {
        this.ngOnInit();
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
      this.guardando = false;
      this.cancelar();
      this.nueva = {
        nombre: '',
        fuente: 0,
        numero: '',
        banco: '',
        tipo: 0,
        saldo: 0.0,
        email: ''
      };
    });
  }

  cancelar() {
    this.modalRef.hide();
  }

  editar(e) {
    e.preventDefault();
    console.log('para editar', this.detalle);
    const datosModif = {
      id: this.detalle.id * 1,
      nombre: this.detalle.nombre,
      tipo_fuente: this.detalle.tipo_fuente,
      bnco_numero: this.detalle.numero,
      bnco_id: this.detalle.banco_id,
      bnco_tipo_cuenta: this.detalle.bnco_tipo_cuenta,
      bnco_saldo_inicial: this.detalle.saldo,
      email: this.detalle.email
    };
    console.log('a editar', datosModif);
    this.service.update(datosModif).subscribe(resp => {
      console.log('modificado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
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
      this.ngOnInit();
      this.cancelar();
    });
  }

  cambio(e, tipo) {
    if (tipo === 'banco') {
      if (e.value === true) {
        this.esBanco = true;
        this.verElectronica = false;
        this.nueva.fuente = 1;
      } else {
        this.esBanco = false;
        this.verElectronica = true;
        this.nueva.fuente = 0;
      }
    } else {
      if (e.value === false) {
        this.esElectronica = false;
        this.verBanco = true;
        this.nueva.fuente = 0;
      } else {
        this.esElectronica = true;
        this.verBanco = false;
        this.nueva.fuente = 2;
      }
    }
  }

  cambioTipoCuenta(e) {
    console.log('cambio tipo cuenta', e);
    const tipo = e.value * 1;
    this.nueva.tipo = tipo;
    this.detalle.tipo = tipo;
  }

  cambioBanco(e) {
    console.log('cambio banco', e);
    const id = e.value * 1;
    this.nueva.banco_id = id;
  }

  cambioBancoDetalle(e) {
    console.log('cambio banco detalle', e);
    const id = e.value * 1;
    this.detalle.banco_id = id;
  }

  cambioTipoCuentaDetalle(e) {
    console.log('cambio tipo cuenta detalle', e);
    const id = e.value * 1;
    this.detalle.bnco_tipo_cuenta = id;
  }

  cambioTipoTarjeta(e) {
    console.log('cambio tipo tarjeta', e);
    const id = e.value * 1;
    this.tarjeta.tipo_tarjeta_id = id;
  }

  cambioMarcaTarjeta(e) {
    console.log('cambio marcas tarjetas', e);
    const id = e.value * 1;
    this.tarjeta.marca_tarjeta_id = id;
  }

  cambioCuenta(e) {
    console.log('cambio cuenta', e);
    const id = e.value * 1;
    this.tarjeta.cuenta_id = id;
  }

  guardarTarjeta(e) {
    e.preventDefault();
    this.service.insertTarjeta(this.tarjeta).subscribe(resp => {
      console.log('guardar tarjeta', resp['_body']);
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
      this.ngOnInit();
    });
  }

  editarTarjeta(e) {
    const tarjetaModif = {
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      numero: e.newData.numero !== undefined ? e.newData.numero : e.oldData.numero,
      tipo_tarjeta_id: e.newData.tipo_tarjeta_id !== undefined ? e.newData.tipo_tarjeta_id : e.oldData.tipo_tarjeta_id,
      marca_tarjeta_id: e.newData.marca_tarjeta_id !== undefined ? e.newData.marca_tarjeta_id : e.oldData.marca_tarjeta_id,
      cuenta_id: e.newData.cuenta_id !== undefined ? e.newData.cuenta_id : e.oldData.cuenta_id,
      id: e.oldData.id
    };
    console.log('a editar tarjeta', tarjetaModif);
    this.service.updateTarjeta(tarjetaModif).subscribe(resp => {
      console.log('tarjeta modificada', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
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
      this.ngOnInit();
    });
  }

  onContentReady(e) {
    e.component.columnOption('command:edit', {
       visibleIndex: -1,
       width: 80
     });
  }

  onCellPrepared(e) {
    if (e.rowType === 'data' && e.column.command === 'edit') {
        const isEditing = e.row.isEditing,
            cellElement = e.cellElement;

        if (isEditing) {
            const saveLink = cellElement.querySelector('.dx-link-save'),
                cancelLink = cellElement.querySelector('.dx-link-cancel');

            saveLink.classList.add('dx-icon-save');
            cancelLink.classList.add('dx-icon-revert');

            saveLink.textContent = '';
            cancelLink.textContent = '';
        } else {
            const editLink = cellElement.querySelector('.dx-link-edit'),
                deleteLink = cellElement.querySelector('.dx-link-delete');

            editLink.classList.add('dx-icon-edit');

            editLink.textContent = '';
        }
    }
  }

}
