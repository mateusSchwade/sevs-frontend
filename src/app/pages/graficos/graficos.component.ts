import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/service/firebase/pedidos/pedidos.service';
import { HomeServiceService } from 'src/app/service/home-service.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  constructor(
    private pedidosService: PedidosService,
    private homeService: HomeServiceService
  ) { }

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
          this.montaGraficos(res);
        });
    } else {
      this.pedidosService.getListByCodusu(usuario.usucod)
        .subscribe(res => {
          this.montaGraficos(res);
        });
    }
  }

  montaGraficos(pedidos) {
    const tipo = { shake: {}, cha: {} };
    pedidos.forEach(element => {
      console.log(element);
      if (element.sshake) {
        if (!tipo.shake[element.sshake.pronom]) {
          tipo.shake[element.sshake.pronom] = 0;
        }
        tipo.shake[element.sshake.pronom] += 1;
      }
      if (element.pshake) {
        if (!tipo.shake[element.pshake.pronom]) {
          tipo.shake[element.pshake.pronom] = 0;
        }
        tipo.shake[element.pshake.pronom] += 1;
      }
      if (element.scha) {
        if (!tipo.cha[element.scha.pronom]) {
          tipo.cha[element.scha.pronom] = 0;
        }
        tipo.cha[element.scha.pronom] += 1;
      }
      if (element.pcha) {
        if (!tipo.cha[element.pcha.pronom]) {
          tipo.cha[element.pcha.pronom] = 0;
        }
        tipo.cha[element.pcha.pronom] += 1;
      }
    });
    Object.keys(tipo.shake).forEach(s => {
      this.shakes.push([s, (tipo.shake[s] / 2)]);
    });
    Object.keys(tipo.cha).forEach(s => {
      this.chas.push([s, tipo.cha[s]]);
    });
  }

}
