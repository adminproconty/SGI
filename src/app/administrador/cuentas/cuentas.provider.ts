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

  public getAllTiposTarjetas() {
    return this.http.get(this.urlProvider.getAllTipoTarjetas())
      .map((res: Response) => res.json());
  }

  public getAllMarcasTarjetas() {
    return this.http.get(this.urlProvider.getAllMarcasTarjetas())
      .map((res: Response) => res.json());
  }

  public all() {
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

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertCuenta(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertTarjeta(objeto: any) {
    return this.http.post(this.urlProvider.insertTarjeta(), JSON.stringify(objeto), {
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

  public updateTarjeta(objeto: Object) {
    return this.http.post(this.urlProvider.updateTarjeta(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
