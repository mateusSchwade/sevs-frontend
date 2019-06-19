import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/service/firebase/pedidos/pedidos.service';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from 'src/app/service/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private homeService: HomeServiceService
  ) { }

  public show = false;
  public pedidosList = [];
  public usuario;
  public shakes = [];
  public chas = [];

  ngOnInit() {
    this.usuario = JSON.parse(this.homeService.getUsuarioLogado());
    this.getPedidos(this.usuario);
  }

  getPedidos(usuario) {
    if (usuario.usutip === 'A') {
      this.pedidosService.getListAll()
        .subscribe(res => {
          this.validaPedidos(res);
          this.pedidosList = res;
        });
    } else {
      this.pedidosService.getListByCodusu(usuario.usucod)
        .subscribe(res => {
          this.validaPedidos(res);
          this.pedidosList = res;
        });
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  validaPedidos(pedidos) {
    if (this.pedidosList.length > 0) {
      this.toastr.info('Houve atualização nos pedidos');
    }
  }

}
