import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavegationProvider } from './navegation.provider';
import { DatosUsuarioProvider } from './../providers/datos.usuario.provider';


@Component({
  selector: 'app-navegation',
  templateUrl: 'navegation.component.html',
  styleUrls: ['navegation.component.css']
})
export class NavegationComponent {
  usuario: any;

  constructor(
    public menu: NavegationProvider,
    private datosUsuario: DatosUsuarioProvider,
    private router: Router) {
    this.usuario = datosUsuario.datos;
    this.menu.setMenu(
      {
        escritorio: 'active',
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

  navegarDashboard(){
    this.menu.setMenu(
        {
          escritorio: 'active',
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

  navegarAdministrador() {
    if(this.menu.menu.administrador.clase == 'treeview') {
        this.menu.setMenu(
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
    }else {
        this.menu.setMenu(
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
  }

  navegarEmpresa(){
    this.menu.setMenu(
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

    navegarLocales() {
        this.menu.setMenu(
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

    navegarCuentas() {
        this.menu.setMenu(
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

    navegarIva() {
        this.menu.setMenu(
            {
              escritorio: '',
              administrador: {
                  clase: 'active treeview',
                  hijos: {
                      empresa: '',
                      locales: '',
                      cuentas: '',
                      iva: 'active',
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

    navegarRoles() {
        this.menu.setMenu(
            {
              escritorio: '',
              administrador: {
                  clase: 'active treeview',
                  hijos: {
                      empresa: '',
                      locales: '',
                      cuentas: '',
                      iva: '',
                      roles: 'active',
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

    navegarUsuarios() {
        this.menu.setMenu(
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

    navegarEmpleados() {
        this.menu.setMenu(
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

    navegarIngresos() {
        if(this.menu.menu.ingresos.clase == 'treeview') {
            this.menu.setMenu(
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
                          empleados: 'active'
                      }
                  },
                  ingresos: {
                      clase: 'active treeview',
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
        }else {
            this.menu.setMenu(
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
    }

    navegarClientes() {
        this.menu.setMenu(
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

    navegarFacturas() {
        this.menu.setMenu(
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
                      facturas: 'actives',
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

    navegarIngresosIngresos() {
        this.menu.setMenu(
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

    navegarEgresos() {
        if(this.menu.menu.egresos.clase == 'treeview') {
            this.menu.setMenu(
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
                      clase: 'treeview',
                      hijos: {
                          clientes: '',
                          facturas: '',
                          ingresos: ''
                      }
                  },
                  egresos: {
                      clase: 'active treeview',
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
        } else {
            this.menu.setMenu(
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
    }

    navegarProveedores() {
        this.menu.setMenu(
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
                  clase: 'treeview',
                  hijos: {
                      clientes: '',
                      facturas: '',
                      ingresos: ''
                  }
              },
              egresos: {
                  clase: 'active treeview',
                  hijos: {
                      proveedores: 'active',
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

    navegarCompras() {
        this.menu.setMenu(
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
                  clase: 'treeview',
                  hijos: {
                      clientes: '',
                      facturas: '',
                      ingresos: ''
                  }
              },
              egresos: {
                  clase: 'active treeview',
                  hijos: {
                      proveedores: '',
                      compras: 'active',
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

    navegarEgresosEgresos() {
        this.menu.setMenu(
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
                  clase: 'treeview',
                  hijos: {
                      clientes: '',
                      facturas: '',
                      ingresos: ''
                  }
              },
              egresos: {
                  clase: 'active treeview',
                  hijos: {
                      proveedores: '',
                      compras: '',
                      egresos: 'active'
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

    navegarContabilidad() {
        if(this.menu.menu.contabilidad.clase == 'treeview') {
            this.menu.setMenu(
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
                      clase: 'active treeview',
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
        } else {
            this.menu.setMenu(
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
    }

    navegarAsientos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: 'active',
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

    navegarPlan() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: '',
                      plan: 'active',
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

    navegarMayores() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: '',
                      plan: '',
                      mayores: 'active',
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

    navegarNuevo() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: '',
                      plan: '',
                      mayores: '',
                      nuevo: 'active',
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

    navegarBancos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: '',
                      plan: '',
                      mayores: '',
                      nuevo: '',
                      bancos: 'active',
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

    navegarActivos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      asientos: '',
                      plan: '',
                      mayores: '',
                      nuevo: '',
                      bancos: '',
                      activos: 'active'
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

    navegarImpuestos() {
        if(this.menu.menu.impuestos.clase == 'treeview') {
            this.menu.setMenu(
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
                      clase: 'active treeview',
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
        } else {
            this.menu.setMenu(
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
    }

    navegarRetenciones() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      retenciones: 'active',
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

    navegarImpuestosIva() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      retenciones: '',
                      iva: 'active'
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

    navegarReportes() {
        if(this.menu.menu.reportes.clase == 'treeview') {
            this.menu.setMenu(
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
                      clase: 'active treeview',
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
        } else {
            this.menu.setMenu(
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
    }

    navegarReportesDashboard() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: 'active',
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

    navegarEpg() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: 'active',
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

    navegarCentro() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: 'active',
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

    navegarBalances() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: '',
                      balances: 'active',
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

    navegarReportesReportes() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: '',
                      balances: '',
                      reportes: 'active',
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

    navegarPresupuestos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: '',
                      balances: '',
                      reportes: '',
                      presupuestos: 'active',
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

    navegarTotales() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: '',
                      balances: '',
                      reportes: '',
                      presupuestos: '',
                      totales: 'active',
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

    navegarMovimientos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      dashboard: '',
                      epg: '',
                      centro: '',
                      balances: '',
                      reportes: '',
                      presupuestos: '',
                      totales: '',
                      movimientos: 'active'
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

    navegarInventario() {
        if(this.menu.menu.inventario.clase == 'treeview') {
            this.menu.setMenu(
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
                      clase: 'active treeview',
                      hijos: {
                          productos: '',
                          requision: '',
                          fisico: '',
                          cardex: ''
                      }
                  }
                }
              );
        } else {
            this.menu.setMenu(
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
    }

    navegarProductos() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      productos: 'active',
                      requision: '',
                      fisico: '',
                      cardex: ''
                  }
              }
            }
          );
    }

    navegarRequision() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      productos: '',
                      requision: 'active',
                      fisico: '',
                      cardex: ''
                  }
              }
            }
          );
    }

    navegarFisico() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      productos: '',
                      requision: '',
                      fisico: 'active',
                      cardex: ''
                  }
              }
            }
          );
    }

    navegarCardex() {
        this.menu.setMenu(
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
                  clase: 'active treeview',
                  hijos: {
                      productos: '',
                      requision: '',
                      fisico: '',
                      cardex: 'active'
                  }
              }
            }
          );
    }

    cerrarSesion() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('locales');
      localStorage.removeItem('datosEmpresa');
      this.router.navigate(['/login']);
    }
}
