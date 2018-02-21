import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  FacturasProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public all() {
    return this.http.get(this.urlProvider.getAllPersonas())
      .map((res: Response) => res.json());
  }

  public getAllTipoDocumentos() {
    return this.http.get(this.urlProvider.getAllTipoDocumento())
      .map((res: Response) => res.json());
  }

  public getAllProductos() {
    return this.http.get(this.urlProvider.getAllProductos())
      .map((res: Response) => res.json());
  }

  public getproductoById(objeto: any) {
    return this.http.post(this.urlProvider.getProductoById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getAllIvas() {
    return this.http.get(this.urlProvider.getAllIVA())
      .map((res: Response) => res.json());
  }

  public getAllFormasPago() {
    return this.http.get(this.urlProvider.getAllFormasPago())
      .map((res: Response) => res.json());
  }

  public getAllTiposTarjetas() {
    return this.http.get(this.urlProvider.getAllTipoTarjetas())
      .map((res: Response) => res.json());
  }

  public getAllCuentas() {
    return this.http.get(this.urlProvider.getAllCuentas())
      .map((res: Response) => res.json());
  }

  public getAllClientes() {
    return this.http.get(this.urlProvider.getAllClientes())
      .map((res: Response) => res.json());
  }

  public getIvaById(objeto: any) {
    return this.http.post(this.urlProvider.getIvaById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getByTipoDocumento(objeto: any) {
    return this.http.post(this.urlProvider.getClienteByTipoDocumento(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getFormasPagoById(objeto: any) {
    return this.http.post(this.urlProvider.getFormasPagoById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getByLocalProducto(objeto: any) {
    return this.http.post(this.urlProvider.getByLocalProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getProductoByLocal(objeto: any) {
    return this.http.post(this.urlProvider.getProductoByLocal(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertCliente(objeto: any) {
    return this.http.post(this.urlProvider.insertPersona(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertFactura(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertPagos(objeto: any) {
    return this.http.post(this.urlProvider.insertPagos(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public update(objeto: Object) {
    return this.http.post(this.urlProvider.updateUsuario(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

  public updateCliente(objeto: Object) {
    return this.http.post(this.urlProvider.updatePersona(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
