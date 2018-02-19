import { ULRProvider } from './../../providers/url.providers';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class  UsuariosProvider {

  constructor(
    private http: Http,
    private urlProvider: ULRProvider) {}

  public getAllTipoDocumento() {
    return this.http.get(this.urlProvider.getAllTipoDocumento())
      .map((res: Response) => res.json());
  }

  public all() {
    return this.http.get(this.urlProvider.getAllUsuarios())
      .map((res: Response) => res.json());
  }

  public getAllLocalUsuario() {
    return this.http.get(this.urlProvider.getAllLocalUsuario())
      .map((res: Response) => res.json());
  }

  public getAllLocales() {
    return this.http.get(this.urlProvider.getAllLocales())
      .map((res: Response) => res.json());
  }

  public getUsuarioLocalByEmpleado(objeto: any) {
    return this.http.post(this.urlProvider.getLocalUsuarioByEmpleado(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
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

  public insertEmpleadoLocal(objeto: any) {
    return this.http.post(this.urlProvider.insertEmpleadoLocal(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .map((resp: Response) => resp);
  }

  public asignarEmpleadoLocal(objeto: any) {
    return this.http.post(this.urlProvider.asignarEmpleadoLocal(), JSON.stringify(objeto), {
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

  public deleteAsignacion(objeto: Object) {
    return this.http.post(this.urlProvider.deleteAsignacion(), JSON.stringify(objeto), {
      headers: new Headers({ 'Content-type': 'application/json' })
      })
      .map((resp: Response) => resp);
  }

}
