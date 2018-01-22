import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatosEmpresaProvider } from './providers/datos.empresa.provider';
import { EmpresaProvider } from './administrador/empresa/empresa.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    translate: TranslateService,
    private empresaProvider: EmpresaProvider,
    private infoEmpresa: DatosEmpresaProvider) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.empresaProvider.all().subscribe(resp => {
      this.infoEmpresa.setDatos(
        {
          id: resp.data[0].id,
          nombre_comercial: resp.data[0].nombre_comercial,
          nombre_legal: resp.data[0].nombre_legal,
          email: resp.data[0].email,
          RUC: resp.data[0].RUC,
          direccion: resp.data[0].direccion,
          telefono: resp.data[0].telefono,
          celular: resp.data[0].celular
        }
      );
    });
  }

}
