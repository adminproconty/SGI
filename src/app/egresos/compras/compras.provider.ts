import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  ComprasProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public all() {
    return this.http.get(this.urlProvider.getAllProveedores())
      .map((res: Response) => res.json());
  }

  public allProveedores() {
    return this.http.get(this.urlProvider.getAllProveedores())
      .map((res: Response) => res.json());
  }

  public getAllProductos() {
    return this.http.get(this.urlProvider.getAllProductos())
      .map((res: Response) => res.json());
  }

  public getAllIVAS() {
    return this.http.get(this.urlProvider.getAllIVA())
      .map((res: Response) => res.json());
  }

  public getAllLocales() {
    return this.http.get(this.urlProvider.getAllLocales())
      .map((res: Response) => res.json());
  }

  public getAllFormasPago() {
    return this.http.get(this.urlProvider.getAllFormasPago())
      .map((res: Response) => res.json());
  }

  public getAllCuentas() {
    return this.http.get(this.urlProvider.getAllCuentas())
      .map((res: Response) => res.json());
  }

  public getAllBancos() {
    return this.http.get(this.urlProvider.getAllBancos())
      .map((res: Response) => res.json());
  }

  public getAllTarjetas() {
    return this.http.get(this.urlProvider.getAllTarjetas())
      .map((res: Response) => res.json());
  }

  public getFormasPagoById(objeto: any) {
    return this.http.post(this.urlProvider.getFormasPagoById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getProductoById(objeto: any) {
    return this.http.post(this.urlProvider.getProductoById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getIvaById(objeto: any) {
    return this.http.post(this.urlProvider.getIvaById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getTarjetaById(objeto: any) {
    return this.http.post(this.urlProvider.getTarjetaById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getCuentaById(objeto: any) {
    return this.http.post(this.urlProvider.getCuentaById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertCompra(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertProductos(objeto: any) {
    return this.http.post(this.urlProvider.insertProductosCompra(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertPagosCompra(objeto: any) {
    return this.http.post(this.urlProvider.insertPagosCompra(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

}
