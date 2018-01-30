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
    banco: '',
    tipo: 0,
    saldo: 0.0,
    email: ''
  };
  guardando: boolean;
  alerts: any = [];
  detalle: any = {
    nombre: '',
    fuente: 0,
    numero: '',
    banco: '',
    tipo: 0,
    saldo: 0.0,
    email: ''
  };

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
    this.deleteRow = 'Eliminar';
    this.editRow = 'Editar';
    this.saveAllChanges = 'Guardar';
    this.saveRowChanges = 'Guardar';
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
      banco: detalles.data.bnco_nombre,
      tipo: detalles.data.bnco_tipo_cuenta,
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
        bnco_nombre: 'NULL',
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
        bnco_nombre: this.nueva.banco,
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
    console.log('para editar', e);
    const datosModif = {
      id: this.detalle.id * 1,
      nombre: this.detalle.nombre,
      bnco_numero: this.detalle.numero,
      bnco_nombre: this.detalle.banco,
      bnco_tipo_cuenta: this.detalle.tipo,
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

}
