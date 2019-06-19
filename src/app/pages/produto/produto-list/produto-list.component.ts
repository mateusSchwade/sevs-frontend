import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfmakeService } from 'src/app/service/pdfmake/pdfmake.service';
import { Relatorios } from 'src/app/utils/relatorios';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private pdfMake: PdfmakeService,
    private relatorios: Relatorios
  ) { }

  public produtosList;
  public produto;

  ngOnInit() {
    this.getprodutosAll();
  }

  getprodutosAll() {
    this.produtoService.getProdutos()
      .subscribe(res => {
        this.produtosList = res;
        console.log(res);
      });
  }

  editar(produto) {
    window.sessionStorage.setItem('u', JSON.stringify(produto));
    this.router.navigate(['/produto/editar']);
  }

  excluir(produto, content) {
    this.produto = produto;
    const modalRef: any = this.modalService.open(content);
    modalRef.result.then(res => {
      this.produtoService.deleteProdutos(produto.procod)
        .subscribe(res => {
          this.toastr.success('produto Excluido com sucesso!');
          this.getprodutosAll();
        });
    }, error => { });
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
    const relatorio = this.relatorios.produtos(this.produtosList);
    this.pdfMake.gerarPdf(relatorio);
  }

}
