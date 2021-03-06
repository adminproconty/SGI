import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  IngresosProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public all() {
    return this.http.get(this.urlProvider.getAllINgresos())
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

  public getPersonaInsertada(objeto: any) {
    return this.http.post(this.urlProvider.getPersonaInsertada(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insert(objeto: any) {
    return this.http.post(this.urlProvider.insertIngresos(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertDirectos(objeto: any) {
    return this.http.post(this.urlProvider.insertIngresosDirectos(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertTransferencia(objeto: any) {
    return this.http.post(this.urlProvider.insertIngresosTransferencia(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertTarjeta(objeto: any) {
    return this.http.post(this.urlProvider.insertIngresosTarjeta(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertCheque(objeto: any) {
    return this.http.post(this.urlProvider.insertIngresosCheque(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public update(objeto: Object) {
    return this.http.post(this.urlProvider.updatePersona(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
