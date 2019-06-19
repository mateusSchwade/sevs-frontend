import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { PedidosService } from 'src/app/service/firebase/pedidos/pedidos.service';
import { ToastrService } from 'ngx-toastr';
import { PdfmakeService } from 'src/app/service/pdfmake/pdfmake.service';
import { Relatorios } from 'src/app/utils/relatorios';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {

  constructor(
    private homeService: HomeServiceService,
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private pdfMake: PdfmakeService,
    private relatorios: Relatorios
  ) { }

  private usuario;
  public pedidosList;

  ngOnInit() {
    this.usuario = JSON.parse(this.homeService.getUsuarioLogado());
    console.log(this.usuario);
    this.getPedidos(this.usuario);
  }

  getPedidos(usuario) {
    if (usuario.usutip === 'A') {
      this.pedidosService.getListAll()
        .subscribe(res => {
          this.pedidosList = res;
          this.pedidosList.sort((a, b) => {
            if (moment(a.data) > moment(b.data)) {
              return -1;
            } else if (moment(a.data) < moment(b.data)) {
              return 1;
            } else {
              return 0;
            }
          });
        });
    } else {
      this.pedidosService.getListByCodusu(usuario.usucod)
        .subscribe(res => {
          this.pedidosList = res;
          this.pedidosList.sort((a, b) => {
            if (moment(a.data) > moment(b.data)) {
              return -1;
            } else if (moment(a.data) < moment(b.data)) {
              return 1;
            } else {
              return 0;
            }
          });
        });
    }
  }

  mudarStatus(pedido, status) {
    pedido.status = status;
    this.pedidosService.putStatusPedido(pedido);
    this.toastr.success('Status Alterado com sucesso');
  }

  formataValor(valor) {
    if (String(valor).includes('.')) {
      const divide = String(valor).split('.');
      if (divide[1].length < 2) {
        if (divide[1].length === 1) {
          divide[1] = divide[1] + '0';
        } else {
          divide[1] = '00';
        }
      }
      return divide[0] + ',' + divide[1];
    } else {
      return valor + ',00';
    }
  }

  gerarRelatorio() {
    const relatorio = this.relatorios.pedidos(this.pedidosList);
    this.pdfMake.gerarPdf(relatorio, 'landscape');
  }

}
