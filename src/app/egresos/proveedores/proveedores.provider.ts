import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  ProveedoresProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public all() {
    return this.http.get(this.urlProvider.getAllProveedores())
      .map((res: Response) => res.json());
  }

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertProveedor(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public update(objeto: Object) {
    return this.http.post(this.urlProvider.updateProveedores(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
