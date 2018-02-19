import { ULRProvider } from './../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  LoginProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public entrar(objeto: any) {
    return this.http.post(this.urlProvider.entrar(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public localesUsuario(objeto: any) {
    return this.http.post(this.urlProvider.localesUsuario(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public datosEmpresa(objeto: any) {
    return this.http.post(this.urlProvider.getDatosEmpresa(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

}
