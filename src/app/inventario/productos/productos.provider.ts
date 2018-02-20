import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  ProductosProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public allCategorias() {
    return this.http.get(this.urlProvider.getAllCategorias())
      .map((res: Response) => res.json());
  }

  public getallIVA() {
    return this.http.get(this.urlProvider.getAllIVA())
      .map((res: Response) => res.json());
  }

  public getIvaById(objeto: any) {
    return this.http.post(this.urlProvider.getIvaById(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertCategoria(objeto: any) {
    return this.http.post(this.urlProvider.insertCategoria(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public updateCategoria(objeto: Object) {
    return this.http.post(this.urlProvider.updateCategoria(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

  public getCodProducto(objeto: Object) {
    return this.http.post(this.urlProvider.getCodProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

  public getIdProductoByCodCategoria(objeto: Object) {
    return this.http.post(this.urlProvider.getIdProductoByCodCategoria(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

  public getCostoByProducto(objeto: Object) {
    return this.http.post(this.urlProvider.getCostoByProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

  public insertProducto(objeto: any) {
    return this.http.post(this.urlProvider.insertProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertCosto(objeto: any) {
    return this.http.post(this.urlProvider.insertCosto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public allProductos() {
    return this.http.get(this.urlProvider.getAllProductos())
      .map((res: Response) => res.json());
  }

  public updateProducto(objeto: any) {
    return this.http.post(this.urlProvider.updateProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json'})
    })
      .map((resp: Response) => resp);
  }

}
