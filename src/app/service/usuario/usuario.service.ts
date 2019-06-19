import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeServiceService } from '../home-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpCLient: HttpClient,
    private homeService: HomeServiceService
  ) { }

  getUsuarios() {
    return this.httpCLient.get(this.homeService.baseUrl + 'usuario', this.homeService.httpOptions);
  }

  postAutenticar(usuario) {
    return this.httpCLient.post(this.homeService.baseUrl + 'usuario/login', usuario, this.homeService.httpOptions);
  }

  postUsuario(usuario) {
    return this.httpCLient.post(this.homeService.baseUrl + 'usuario', usuario, this.homeService.httpOptions);
  }

  putUsuario(usuario) {
    return this.httpCLient.put(this.homeService.baseUrl + 'usuario', usuario, this.homeService.httpOptions);
  }

  deleteUsuario(usucod) {
    return this.httpCLient.delete(this.homeService.baseUrl + 'usuario/' + usucod, this.homeService.httpOptions);
  }

  getUsuario(usucod) {
    return this.httpCLient.get(this.homeService.baseUrl + 'usuario/' + usucod, this.homeService.httpOptions);
  }

}

