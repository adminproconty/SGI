import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NavegationProvider } from '../../navegation/navegation.provider';
import { ProductosProvider } from './productos.provider';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.css']
})

export class ProductosComponent implements OnInit {
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

  categorias: any = [];
  productos: any = [];
  alerts: any = [];
  categoria: any = {
    empresa_id: 1,
    nombre: '',
    abreviatura: '',
    descripcion: ''
  };
  producto: any = {
    categoria_id: 0,
    nombre: '',
    unidad: '',
    codigo: '',
    descripcion: '',
    servicio: 0
  };
  guardando: boolean;
  servicio: boolean;
  activo: boolean;
  ivas: any = [];

  constructor(
    private navegation: NavegationProvider,
    private modalService: BsModalService,
    private service: ProductosProvider) {
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

  ngOnInit() {
    this.service.getallIVA().subscribe(resp => {
      console.log('IVA', resp.data);
      this.ivas = resp.data;
    });
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
    this.categoria = {
      empresa_id: 1,
      nombre: '',
      abreviatura: '',
      descripcion: ''
    };
    this.producto = {
      categoria_id: 0,
      nombre: '',
      unidad: '',
      codigo: '',
      descripcion: '',
      costo: undefined,
      servicio: 0,
      activo: 1,
      iva_id: 0
    };
    this.guardando = false;
    this.service.allCategorias().subscribe(resp => {
      console.log('categorias', resp.data);
      this.categorias = resp.data;
    });
    this.service.allProductos().subscribe(resp => {
      console.log('productos', resp.data);
      this.productos = resp.data;
    });
    this.servicio = false;
    this.activo = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, {ignoreBackdropClick: this.backClick}, { })
    );
  }

  guardarCategoria(e) {
    e.preventDefault();
    this.guardando = true;
    console.log('categoria a guardar', this.categoria);
    this.service.insertCategoria(this.categoria).subscribe(resp => {
      console.log('categoria guardada', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Guardado exitoso'
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

  guardarProducto(e) {
    e.preventDefault();
    this.guardando = true;
    console.log('producto a guardar', this.producto);
    this.service.insertProducto(this.producto).subscribe(resp => {
      console.log('producto guardado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.consultarId(this.producto.codigo, this.producto.categoria_id);
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

  consultarId(cod, cat) {
    this.service.getIdProductoByCodCategoria({codigo: cod, categoria_id: cat}).subscribe(resp => {
      const respuesta = JSON.parse(resp['_body']);
      console.log('respuesta get id', respuesta);
      const id = respuesta.data[0].id * 1;
      this.insertCosto(id);
    });
  }

  insertCosto(id) {
    this.service.insertCosto({producto_id: id, costo: this.producto.costo}).subscribe(resp => {
      console.log('insert costo', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Guardado exitoso'
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

  editarCategoria(e) {
    console.log('editar', e);
    const catModif = {
      id: e.oldData.id,
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      abreviatura: e.newData.abreviatura !== undefined ? e.newData.abreviatura : e.oldData.abreviatura,
      descripcion: e.newData.descripcion !== undefined ? e.newData.descripcion : e.oldData.descripcion,
      activo: e.newData.activo !== undefined ? e.newData.activo : e.oldData.activo
    };
    if (catModif.activo === true) {
      catModif.activo = 1;
    } else {
      catModif.activo = 0;
    }
    this.service.updateCategoria(catModif).subscribe(resp => {
      console.log('cat modificada', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
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

  cambioCategoria(e) {
    console.log('cambio categoria', e);
    const tipo = e.value * 1;
    this.producto.categoria_id = tipo;
    const env = {
      categoria_id: tipo
    };
    this.service.getCodProducto(env).subscribe(resp => {
      console.log('código producto', JSON.parse(resp['_body']));
      const res = JSON.parse(resp['_body']);
      this.producto.codigo = res.data[0];
      console.log(this.producto.codigo);
    });
  }

  editarProducto(e) {
    const prodModif = {
      categoria_id: e.newData.categoria_id !== undefined ? e.newData.categoria_id : e.oldData.categoria_id,
      nombre: e.newData.nombre !== undefined ? e.newData.nombre : e.oldData.nombre,
      unidad: e.newData.unidad !== undefined ? e.newData.unidad : e.oldData.unidad,
      codigo: e.newData.codigo !== undefined ? e.newData.codigo : e.oldData.codigo,
      descripcion: e.newData.descripcion !== undefined ? e.newData.descripcion : e.oldData.descripcion,
      servicio: e.newData.servicio !== undefined ? e.newData.servicio : e.oldData.servicio,
      activo: e.newData.activo !== undefined ? e.newData.activo : e.oldData.activo,
      iva_id: e.newData.iva_id !== undefined ? e.newData.iva_id : e.oldData.iva_id,
      id: e.oldData.id
    };
    if (prodModif.servicio === true) {
      prodModif.servicio = 1;
    } else {
      prodModif.servicio = 0;
    }
    if (prodModif.activo === true) {
      prodModif.activo = 1;
    } else {
      prodModif.activo = 0;
    }
    if (e.newData.costo) {
      this.service.updateProducto(prodModif).subscribe(resp => {
        console.log('producto modificado', resp['_body']);
        if (resp['_body'] === 'true') {
          this.actualizarCosto(e.oldData.id, e.newData.costo);
        } else {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
        }
      });
    } else {
      console.log('producto modificar', prodModif);
      this.service.updateProducto(prodModif).subscribe(resp => {
        console.log('producto modificado', resp['_body']);
        if (resp['_body'] === 'true') {
          this.alerts.push(
            {
              type: 'success',
              msg: 'Modificado exitosamente'
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
  }

  actualizarCosto(prod, costo) {
    this.service.insertCosto({producto_id: prod, costo: costo}).subscribe(resp => {
      console.log('costo actualizado', resp['_body']);
      if (resp['_body'] === 'true') {
        this.alerts.push(
          {
            type: 'success',
            msg: 'Modificado exitosamente'
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

  cambiarAbreviatura(e) {
    this.categoria.abreviatura = e.value.substr(0, 4).toUpperCase();
  }

  cambioServicio(e) {
    if (e.value === true) {
      this.producto.servicio = 1;
    } else {
      this.producto.servicio = 0;
    }
  }

  cambioActivo(e) {
    if (e.value === true) {
      this.producto.activo = 1;
    } else {
      this.producto.activo = 0;
    }
  }

  displayIvas(item) {
    if (!item) {
      return '';
    }
    return item.nombre + ' - ' + item.cantidad + '%';
  }

  cambioIva(e) {
    console.log('cambio iva', e);
    const codigo = e.value * 1;
    this.service.getIvaById({id: codigo}).subscribe(resp => {
      const data = JSON.parse(resp['_body']);
      console.log('iva consultado', data);
      this.producto.iva_id = data.id * 1;
    });
  }

}
