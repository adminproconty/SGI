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

  public insertProducto(objeto: any) {
    return this.http.post(this.urlProvider.insertProducto(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public allProductos() {
    return this.http.get(this.urlProvider.getAllProductos())
      .map((res: Response) => res.json());
  }

}
