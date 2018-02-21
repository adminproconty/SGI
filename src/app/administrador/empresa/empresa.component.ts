import { DatosEmpresaProvider } from './../../providers/datos.empresa.provider';
import { EmpresaProvider } from './empresa.provider';
import { Component, OnInit } from '@angular/core';

import { NavegationProvider } from '../../navegation/navegation.provider';

@Component({
  selector: 'app-empresa',
  templateUrl: 'empresa.component.html',
  styleUrls: ['empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  phonePattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  phoneRules: any = {
    X: /[02-9]/
  };
  datosEmpresa: any = {};
  empresa: any = {};
  guardando: boolean;
  alerts: any = [];
  dismissible: boolean;

  constructor(
    private navegation: NavegationProvider,
    private service: EmpresaProvider,
    private infoEmpresa: DatosEmpresaProvider) {
    this.navegation.setMenu(
      {
        escritorio: '',
        administrador: {
            clase: 'active treeview',
            hijos: {
                empresa: 'active',
                locales: '',
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
    this.empresa = this.infoEmpresa.datos;
    this.empresa.serie = 'S-000-001';
    this.empresa.factura = '15';
    this.guardando = false;
    this.dismissible = true;
  }

  guardar() {
    if (this.empresa.nombre_legal !== '' && this.empresa.nombre_comercial !== '' &&
        this.empresa.email !== '' && this.empresa.RUC !== '' && this.empresa.direccion !== ''
        && this.empresa.telefono !== '' && this.empresa.celular !== '') {
          this.guardando = true;
          this.service.update(this.empresa).subscribe(resp => {
            console.log('update', resp['_body']);
            this.guardando = false;
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

}
