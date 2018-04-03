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
    materia_prima: 0,
    producto_final: 1,
    precio_final: 0.0
  };
  guardando: boolean;
  servicio: boolean;
  activo: boolean;
  ivas: any = [];
  tiposProducto: any = [];
  tipoProducto: any = {};
  producto_ivas: any;

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
    this.deleteRow = '';
    this.editRow = '';
    this.saveAllChanges = '';
    this.saveRowChanges = '';
    this.undeleteRow = 'No eliminar';
    this.validationCancelChanges = 'Cancelar';
    this.categoria.nombre = '';
    this.categoria.abreviatura = '';
    this.categoria.descripcion = '';
    this.producto = {
      categoria_id: 0,
      nombre: '',
      unidad: '',
      codigo: '',
      descripcion: '',
      costo: undefined,
      materia_prima: 0,
      producto_final: 1,
      precio_final: 0.0
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
    this.producto_ivas = [];
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
      descripcion: e.newData.descripcion !== undefined ? e.newData.descripcion : e.oldData.descripcion
    };
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

  cambioMateriaPrima(e) {
    if (e.value === true) {
      this.producto.materia_prima = 1;
    } else {
      this.producto.materia_prima = 0;
    }
  }

  cambioProductoFinal(e) {
    if (e.value === true) {
      this.producto.producto_final = 1;
    } else {
      this.producto.producto_final = 0;
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

  changeImpuestos(e) {
    console.log('cambio local', e);
    if (e.value.length > 0) {
      const data = [];
      for (let i = 0; i < e.value.length; i++) {
        const valor = e.value[i] * 1;
        this.service.getIvaById(
          {
            id: valor
          }
        ).subscribe(resp => {
          const respuesta = JSON.parse(resp['_body']);
          console.log('ivas', respuesta);
          data.push(respuesta);
        });
      }
      this.producto_ivas = data;
      console.log('producto_ivas', this.producto_ivas);
      this.calcularPrecioFinal();
    }
  }

  calcularPrecioFinal() {
    let costoFinal = 0;
    for (let i = 0; i < this.producto_ivas.length; i++) {
      let iva = 0;
      const costo = this.producto.costo * 1;
      const producto_iva = this.producto_ivas[i].cantidad * 1;
      iva = costo * producto_iva / 100;
      costoFinal = costoFinal + iva;
      console.log('costo final', costoFinal);
      console.log('costo iva', iva);
    }
    this.producto.precio_final = costoFinal.toFixed(2);
  }

}
