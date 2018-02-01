import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  EmpleadosProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public getAllTipoDocumento() {
    return this.http.get(this.urlProvider.getAllTipoDocumento())
      .map((res: Response) => res.json());
  }

  public all() {
    return this.http.get(this.urlProvider.getAllEmpleados())
      .map((res: Response) => res.json());
  }

  public insertPersona(objeto: any) {
    return this.http.post(this.urlProvider.insertPersona(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public getPersonaInsertada(objeto: any) {
    return this.http.post(this.urlProvider.getPersonaInsertada(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public insertUsuario(objeto: any) {
    return this.http.post(this.urlProvider.insertUsuario(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public updateUsuario(objeto: Object) {
    return this.http.post(this.urlProvider.updateUsuario(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
