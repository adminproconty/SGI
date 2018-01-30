import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  CuentasProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public getAllTipoCuentas() {
    return this.http.get(this.urlProvider.getAllTipoCuentas())
      .map((res: Response) => res.json());
  }

  public all() {
    return this.http.get(this.urlProvider.getAllCuentas())
      .map((res: Response) => res.json());
  }

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertCuenta(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public update(objeto: Object) {
    return this.http.post(this.urlProvider.updateCuenta(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
