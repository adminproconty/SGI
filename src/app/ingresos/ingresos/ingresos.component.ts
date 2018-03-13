import { Component, TemplateRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavegationProvider } from '../../navegation/navegation.provider';
import { IngresosProvider } from './ingresos.provider';
import { DatosEmpresaProvider } from './../../providers/datos.empresa.provider';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: 'ingresos.component.html',
  styleUrls: ['ingresos.component.css']
})

export class IngresosComponent implements OnInit {
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
  cuentas: any = [];
  tabs: any = [];
  tabContent: string;
  ingresoDirecto: any = [];
  transferencias: any = [];
  tarjetas: any = [];
  cheques: any = [];
  ingresos: any = {};
  alerts: any = [];
  fecha: any;
  bancos: any = [];
  ingresosTarjetas: any = [];
  nuevo: boolean;
  detalles: any;
  modalRef: BsModalRef;
  backClick: false;

  constructor(
    private navegation: NavegationProvider,
    private service: IngresosProvider,
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private datosEmpresa: DatosEmpresaProvider) {
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
                clientes: '',
                facturas: '',
                ingresos: 'active'
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
    this.service.getAllCuentas().subscribe(resp => {
      console.log('cuentas', resp.data);
      this.cuentas = resp.data;
    });
    this.tabs = [
      {
        id: 0,
        text: 'Ingreso directo',
        icon: 'fa fa-money',
        content: 'Ingreso directo'
      }, {
        id: 1,
        text: 'Transferencia',
        icon: 'fa fa-exchange',
        content: 'Transferencia'
      }, {
        id: 2,
        text: 'Cheque',
        icon: 'fa fa-money',
        content: 'Cheque'
      }, {
        id: 3,
        text: 'Tarjeta',
        icon: 'fa fa-credit-card',
        content: 'Tarjeta'
      }
    ];
    this.tabContent = this.tabs[0].content;
    this.service.getAllTarjetas().subscribe(resp => {
      console.log('tarjetas', resp.data);
      this.tarjetas = resp.data;
    });
    this.ingresos.empresa_id = this.datosEmpresa.datos.id;
    this.ingresos.recibo = '';
    this.ingresos.cuenta_id = 'NULL';
    this.ingresos.descripcion = '';
    this.ingresos.referencia = '';
    this.ingresos.documento = '';
    this.ingresos.total = 0.0;
    this.ingresos.tipo_ingreso = 1;
    this.fecha = undefined;
    this.ingresoDirecto = [];
    this.transferencias = [];
    this.service.getAllBancos().subscribe(resp => {
      console.log('bancos', resp.data);
      this.bancos = resp.data;
    });
    this.ingresosTarjetas = [];
    this.cheques = [];
    this.service.all().subscribe(resp => {
      console.log('ingresos', resp.data);
      this.ingresos = resp.data;
    });
    this.nuevo = false;
  }

  guardar(e) {
    e.preventDefault();
    console.log('a guardar', this.ingresos);
    this.service.insert(this.ingresos).subscribe(resp => {
      console.log('ingresos guardado', resp['_body']);
      if (resp['_body'] === 'false') {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
      } else {
        if (this.ingresos.tipo_ingreso === 1) {
          this.guardarIngresosDirectos(resp['_body']);
        } else if (this.ingresos.tipo_ingreso === 2) {
          this.guardarIngresosTransferencia(resp['_body']);
        } else if (this.ingresos.tipo_ingreso === 3) {
          this.guardarIngresosCheque(resp['_body']);
        } else if (this.ingresos.tipo_ingreso === 4) {
          this.guardarIngresosTarjeta(resp['_body']);
        } else if (this.ingresos.tipo_ingreso === 5) {
          /*CXC*/
        }
      }
    });
  }

  guardarIngresosDirectos(idingreso) {
    let exito = 1;
    for (let i = 0; i < this.ingresoDirecto.length; i++) {
      this.ingresoDirecto[i].ingresos_id = idingreso * 1;
      const dateString = this.ingresoDirecto[i].fecha;
      const newDate = new Date(dateString);
      this.ingresoDirecto[i].fecha = this.datepipe.transform(newDate, 'yyyy-MM-dd');
      this.service.insertDirectos(this.ingresoDirecto[i]).subscribe(resp => {
        console.log('resp ingreso directo', resp['_body']);
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          exito = 0;
        }
      });
    }
    if (exito === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Ingreso Nº ' + idingreso + ' Guardado exitoso'
        }
      );
    }
    this.ngOnInit();
  }

  guardarIngresosTransferencia(idingreso) {
    console.log('a gardar transferencias', this.transferencias);
    let exito = 1;
    for (let i = 0; i < this.transferencias.length; i++) {
      this.transferencias[i].ingresos_id = idingreso * 1;
      this.service.insertTransferencia(this.transferencias[i]).subscribe(resp => {
        console.log('resp ingreso transferencia', resp['_body']);
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          exito = 0;
        }
      });
    }
    if (exito === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Ingreso Nº ' + idingreso + ' Guardado exitoso'
        }
      );
    }
    this.ngOnInit();
  }

  guardarIngresosTarjeta(idingreso) {
    console.log('a gardar tarjetas', this.ingresosTarjetas);
    let exito = 1;
    for (let i = 0; i < this.ingresosTarjetas.length; i++) {
      this.ingresosTarjetas[i].ingresos_id = idingreso * 1;
      const dateString = this.ingresosTarjetas[i].fecha;
      const newDate = new Date(dateString);
      this.ingresosTarjetas[i].fecha = this.datepipe.transform(newDate, 'yyyy-MM-dd');
      this.service.insertTarjeta(this.ingresosTarjetas[i]).subscribe(resp => {
        console.log('resp ingreso tarjetas', resp['_body']);
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          exito = 0;
        }
      });
    }
    if (exito === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Ingreso Nº ' + idingreso + ' Guardado exitoso'
        }
      );
    }
    this.ngOnInit();
  }

  guardarIngresosCheque(idingreso) {
    console.log('a gardar cheques', this.cheques);
    let exito = 1;
    for (let i = 0; i < this.cheques.length; i++) {
      this.cheques[i].ingresos_id = idingreso * 1;
      const dateString = this.cheques[i].fecha;
      const newDate = new Date(dateString);
      this.cheques[i].fecha = this.datepipe.transform(newDate, 'yyyy-MM-dd');
      this.service.insertCheque(this.cheques[i]).subscribe(resp => {
        console.log('resp ingreso cheques', resp['_body']);
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          exito = 0;
        }
      });
    }
    if (exito === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Ingreso Nº ' + idingreso + ' Guardado exitoso'
        }
      );
    }
    this.ngOnInit();
  }

  cancelar() {
    this.ngOnInit();
  }

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
    switch (this.tabContent) {
      case 'Ingreso directo':
        this.ingresos.tipo_ingreso = 1;
        break;

      case 'Transferencia':
        this.ingresos.tipo_ingreso = 2;
        break;

      case 'Cheque':
        this.ingresos.tipo_ingreso = 3;
        break;

      case 'Tarjeta':
        this.ingresos.tipo_ingreso = 4;
        break;

      case 'CXC':
        this.ingresos.tipo_ingreso = 5;
        break;

      default:
        break;
    }
  }

  editarIngresoDirecto(e) {
    console.log('editar', e);
  }

  eliminarIngresoDirecto(e) {
    console.log('eliminar', e);
  }

  editarTransferencia(e) {
    console.log('editar', e);
  }

  eliminarTransferencia(e) {
    console.log('eliminar', e);
  }

  editarCheque(e) {
    console.log('editar', e);
  }

  eliminarCheque(e) {
    console.log('eliminar', e);
  }

  cambioFecha(e) {
    const dateString = e.value;
    const newDate = new Date(dateString);
    this.ingresos.fecha = this.datepipe.transform(newDate, 'yyyy-MM-dd');
    console.log('cambio fecha', this.ingresos.fecha);
  }

  cambioCuenta(e) {
    console.log('cambio cuenta', e);
    this.ingresos.cuenta_id = e.value * 1;
  }

  calcularCosto() {
    switch (this.ingresos.tipo_ingreso) {
      case 1:
        let debe = 0;
        let haber = 0;
        let total = 0;
        for (let i = 0; i < this.ingresoDirecto.length; i++) {
          debe = debe + (this.eliminarIngresoDirecto[i].Debe * 1);
        }
        for (let i = 0; i < this.ingresoDirecto.length; i++) {
          haber = haber + (this.eliminarIngresoDirecto[i].Haber * 1);
        }
        total = debe - haber;
        this.ingresos.total = total;
        break;

      case 2:
        let totalTransferencia = 0;
        for (let i = 0; i < this.transferencias.length; i++) {
          totalTransferencia = totalTransferencia + (this.transferencias[i].monto * 1);
        }
        this.ingresos.total = totalTransferencia;
        break;

      case 3:
        let totalCheque = 0;
        for (let i = 0; i < this.cheques.length; i++) {
          totalCheque = totalCheque + (this.cheques[i].monto * 1);
        }
        this.ingresos.total = totalCheque;
        break;

      case 4:
        let totalTarjeta = 0;
        for (let i = 0; i < this.ingresosTarjetas.length; i++) {
          totalTarjeta = totalTarjeta + (this.ingresosTarjetas[i].monto * 1);
        }
        this.ingresos.total = totalTarjeta;
        break;

      default:
        break;
    }
  }

  crear() {
    this.nuevo = true;
  }

  verDetalles(data: any, template: TemplateRef<any>) {
    console.log('detalles', data);
    this.detalles = data.data;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  cerrar() {
    this.modalRef.hide();
  }

}
