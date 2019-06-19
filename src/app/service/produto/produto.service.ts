import { Injectable } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpCLient: HttpClient,
    private homeService: HomeServiceService
  ) { }

  getProdutos() {
    return this.httpCLient.get(this.homeService.baseUrl + 'produto', this.homeService.httpOptions);
  }

  postProdutos(produto) {
    return this.httpCLient.post(this.homeService.baseUrl + 'produto', produto, this.homeService.httpOptions);
  }

  putProdutos(produto) {
    return this.httpCLient.put(this.homeService.baseUrl + 'produto', produto, this.homeService.httpOptions);
  }

  deleteProdutos(procod) {
    return this.httpCLient.delete(this.homeService.baseUrl + 'produto/' + procod, this.homeService.httpOptions);
  }

  getProdutosTipo(tipo) {
    return this.httpCLient.get(this.homeService.baseUrl + 'produto/tipos/' + tipo, this.homeService.httpOptions);
  }

}
