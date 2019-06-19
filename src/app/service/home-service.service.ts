import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(
  ) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=iso-8859-1'
    })
  };

  public baseUrl = 'http://localhost:8080/sevs/rest/';

  getUsuarioLogado() {
    return window.sessionStorage.getItem('usuarioLogado');
  }

}
