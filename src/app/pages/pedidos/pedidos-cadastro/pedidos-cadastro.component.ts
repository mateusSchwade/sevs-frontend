import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { PedidosService } from 'src/app/service/firebase/pedidos/pedidos.service';
import * as moment from 'moment/moment';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {

  constructor(
    private homeService: HomeServiceService,
    private pedidosService: PedidosService,
    private toastr: ToastrService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  public formPedido: FormGroup;
  public pedido = { pcha: null, scha: null, pshake: null, sshake: null, usuario: null, preco: null, status: null, data: null };
  public usuario;
  public chaList;
  public shakeList;


  ngOnInit() {
    this.pedidosForm();
    this.usuario = JSON.parse(this.homeService.getUsuarioLogado());
    this.getCha();
    this.getShake();
  }

  getCha() {
    this.produtoService.getProdutosTipo('C')
      .subscribe(res => {
        this.chaList = res;
      });
  }

  getShake() {
    this.produtoService.getProdutosTipo('S')
      .subscribe(res => {
        this.shakeList = res;
      });
  }

  pedidosForm() {
    this.formPedido = new FormGroup({
      pcha: new FormControl(this.pedido.pcha),
      scha: new FormControl(this.pedido.scha),
      pshake: new FormControl(this.pedido.pshake),
      sshake: new FormControl(this.pedido.sshake),
      usuario: new FormControl(this.pedido.usuario),
      status: new FormControl(this.pedido.status),
      data: new FormControl(this.pedido.data),
      preco: new FormControl(this.pedido.preco)
    });
  }

  salvar() {
    const pedido = this.formPedido.value;
    pedido.status = 1;
    pedido.usuario = this.usuario;
    pedido.codusu = this.usuario.usucod;
    pedido.data = moment().format('LLLL');
    this.pedidosService.postPedido(pedido);
    this.toastr.success('Pedido cadastrado com sucesso');
    this.router.navigate(['/pedidos']);
  }

  calcula() {
    const formulario = this.formPedido.value;
    const valor =
      (formulario.pcha ? formulario.pcha.propre : 0) +
      (formulario.scha ? formulario.scha.propre : 0) +
      (formulario.pshake ? (formulario.pshake.propre / 2) : 0) +
      (formulario.sshake ? (formulario.sshake.propre / 2) : 0);

    this.formPedido.patchValue({ preco: valor });
  }

  cancelar() {
    this.router.navigate(['/pedidos']);
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

}
