import { Injectable } from '@angular/core';

@Injectable()
export class NavegationProvider {

    public menu: any = {};

    constructor() {}

    public setMenu(tipo) {
        this.menu = {
            escritorio: tipo.escritorio,
            administrador: {
                clase: tipo.administrador.clase,
                hijos: {
                    empresa: tipo.administrador.hijos.empresa,
                    locales: tipo.administrador.hijos.locales,
                    cuentas: tipo.administrador.hijos.cuentas,
                    iva: tipo.administrador.hijos.iva,
                    roles: tipo.administrador.hijos.roles,
                    usuarios: tipo.administrador.hijos.usuarios,
                    empleados: tipo.administrador.hijos.empleados
                }
            },
            ingresos: {
                clase: tipo.ingresos.clase,
                hijos: {
                    clientes: tipo.ingresos.hijos.clientes,
                    facturas: tipo.ingresos.hijos.facturas,
                    ingresos: tipo.ingresos.hijos.ingresos
                }
            },
            egresos: {
                clase: tipo.egresos.clase,
                hijos: {
                    proveedores: tipo.egresos.hijos.proveedores,
                    compras: tipo.egresos.hijos.compras,
                    egresos: tipo.egresos.hijos.egresos
                }
            },
            contabilidad: {
                clase: tipo.contabilidad.clase,
                hijos: {
                    asientos: tipo.contabilidad.hijos.asientos,
                    plan: tipo.contabilidad.hijos.plan,
                    mayores: tipo.contabilidad.hijos.mayores,
                    nuevo: tipo.contabilidad.hijos.nuevo,
                    bancos: tipo.contabilidad.hijos.bancos,
                    activos: tipo.contabilidad.hijos.activos
                }
            },
            impuestos: {
                clase: tipo.impuestos.clase,
                hijos: {
                    retenciones: tipo.impuestos.hijos.retenciones,
                    iva: tipo.impuestos.hijos.iva
                }
            },
            reportes: {
                clase: tipo.reportes.clase,
                hijos: {
                    dashboard: tipo.reportes.hijos.dashboard,
                    epg: tipo.reportes.hijos.epg,
                    centro: tipo.reportes.hijos.centro,
                    balances: tipo.reportes.hijos.balances,
                    reportes: tipo.reportes.hijos.reportes,
                    presupuestos: tipo.reportes.hijos.presupuestos,
                    totales: tipo.reportes.hijos.totales,
                    movimientos: tipo.reportes.hijos.movimientos
                }
            },
            inventario: {
                clase: tipo.inventario.clase,
                hijos: {
                    productos: tipo.inventario.hijos.productos,
                    requision: tipo.inventario.hijos.requision,
                    fisico: tipo.inventario.hijos.fisico,
                    cardex: tipo.inventario.hijos.cardex
                }
            }
        };
    }
}
