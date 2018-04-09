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
  detallesProducto: any;

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
    console.log('producto ivas', this.producto_ivas);
    this.service.insertProducto(this.producto).subscribe(resp => {
      console.log('producto guardado', resp['_body']);
      if (resp['_body'] !== 'false') {
        this.insertCosto(resp['_body']);
        this.insertarProductoIvas(resp['_body']);
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

  insertarProductoIvas(producto) {
    let save = 1;
    for (let i = 0; i < this.producto_ivas.length; i++) {
      this.service.insertProductoIvas(
        {
          producto_id: producto,
          iva_id: this.producto_ivas[i].id
        }
      ).subscribe(resp => {
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          this.guardando = false;
          save = 0;
        }
      });
    }
    if (save === 1) {
      this.alerts.push(
        {
          type: 'success',
          msg: 'Guardado exitoso'
        }
      );
      this.ngOnInit();
      this.cancelar();
    }
  }

  insertCosto(id) {
    this.service.insertCosto({producto_id: id, costo: this.producto.costo}).subscribe(resp => {
      console.log('insert costo', resp['_body']);
      if (resp['_body'] === 'false') {
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
    this.detallesProducto.categoria_id = e.value;
  }

  editarProducto(e) {
    e.preventDefault();
    console.log('a editar', this.detallesProducto);
    if (this.detallesProducto.materia_prima === true) {
      this.detallesProducto.materia_prima = 1;
    } else if (this.detallesProducto.materia_prima === false) {
      this.detallesProducto.materia_prima = 0;
    }
    if (this.detallesProducto.producto_final === true) {
      this.detallesProducto.producto_final = 1;
    } else if (this.detallesProducto.producto_final === false) {
      this.detallesProducto.producto_final = 0;
    }
    if (this.detallesProducto.impuestos.length > 0) {
      this.eliminarProductoIvas();
    }
    this.service.updateProducto(this.detallesProducto).subscribe(resp => {
      if (resp['_body'] === 'false') {
        this.alerts.push(
          {
            type: 'danger',
            msg: 'Error, por favor contacte al administrador del sistema'
          }
        );
      }
    });
    this.actualizarCosto(this.detallesProducto.id, this.detallesProducto.costo);
  }

  eliminarProductoIvas() {
    let bien = 1;
    for (let i = 0; i < this.detallesProducto.iva.length; i++) {
      this.service.deleteProductoIvas({id: this.detallesProducto.iva[i].id}).subscribe(resp => {
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          bien = 0;
        }
      });
    }
    if (bien === 1) {
      this.insertarProductoIvasDetalle();
    }
  }

  insertarProductoIvasDetalle() {
    let save = 1;
    for (let i = 0; i < this.detallesProducto.impuestos.length; i++) {
      this.service.insertProductoIvas(
        {
          producto_id: this.detallesProducto.id,
          iva_id: this.detallesProducto.impuestos[i].id
        }
      ).subscribe(resp => {
        if (resp['_body'] === 'false') {
          this.alerts.push(
            {
              type: 'danger',
              msg: 'Error, por favor contacte al administrador del sistema'
            }
          );
          this.guardando = false;
          save = 0;
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
        this.cancelar();
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
      this.detallesProducto.materia_prima = 1;
    } else {
      this.producto.materia_prima = 0;
      this.detallesProducto.materia_prima = 0;
    }
  }

  cambioProductoFinal(e) {
    if (e.value === true) {
      this.producto.producto_final = 1;
      this.detallesProducto.producto_final = 1;
    } else {
      this.producto.producto_final = 0;
      this.detallesProducto.producto_final = 1;
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
          this.calcularPrecioFinal(data);
        });
      }
      this.producto_ivas = data;
      console.log('producto_ivas', this.producto_ivas);
    } else {
      this.producto.precio_final = 0.0;
    }
  }

  calcularPrecioFinal(ivas) {
    let precio = 0;
    if (ivas.length > 0) {
      for (let i = 0; i < ivas.length; i++) {
        console.log('iteración ', i);
        let iva = 0;
        const costo = this.producto.costo * 1;
        const producto_iva = ivas[i].cantidad * 1;
        iva = costo * producto_iva / 100;
        precio = costo + iva;
        this.producto.precio_final = precio.toFixed(2);
        console.log('costo final', this.producto.precio_final);
        console.log('costo iva', iva);
      }
    }
  }

  crearCodigoProducto(e) {
    this.service.getCodProducto(this.producto).subscribe(resp => {
      const info = JSON.parse(resp['_body']);
      this.producto.codigo = info.data.codigo + '-'
        + e.value.substr(0, 4).toUpperCase() + '-' + info.data.numero;
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
        const editLink = cellElement.querySelector('.dx-link-edit');
        editLink.classList.add('dx-icon-edit');

        editLink.textContent = '';
      }
    }
  }

  openDetalle(modal, datos) {
    this.openModal(modal);
    this.detallesProducto = datos.data;
    this.detallesProducto.mp = datos.data.materia_prima;
    this.detallesProducto.pf = datos.data.producto_final;
    this.detallesProducto.impuestos = [];
    this.calcularPrecioFinalDetalle(this.detallesProducto.iva);
    console.log('detalle producto', this.detallesProducto);
  }

  changeImpuestosDetalle(e) {
    console.log('cambio impuesto', e);
    this.detallesProducto.ivas = e.value;
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
          this.calcularPrecioFinalDetalle(data);
        });
      }
      this.detallesProducto.impuestos = data;
      console.log('producto_ivas', this.detallesProducto.iva);
    } else {
      this.producto.precio_final = 0.0;
    }
  }

  calcularPrecioFinalDetalle(ivas) {
    let precio = 0;
    if (ivas.length > 0) {
      for (let i = 0; i < ivas.length; i++) {
        console.log('iteración ', i);
        let iva = 0;
        const costo = this.detallesProducto.costo * 1;
        const producto_iva = ivas[i].cantidad * 1;
        iva = costo * producto_iva / 100;
        precio = costo + iva;
        this.producto.precio_final = precio.toFixed(2);
        console.log('costo final', this.producto.precio_final);
        console.log('costo iva', iva);
      }
    }
  }

}
