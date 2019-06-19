import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProdutoService } from 'src/app/service/produto/produto.service';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-cadastrar',
  templateUrl: './produto-cadastrar.component.html',
  styleUrls: ['./produto-cadastrar.component.css']
})
export class ProdutoCadastrarComponent implements OnInit {

  constructor(
    private homeService: HomeServiceService,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public formProduto: FormGroup;
  public produto = { procod: null, pronom: null, protip: null, propre: null };

  ngOnInit() {
    this.produtosForm();
    if (this.route.snapshot.paramMap.get('acao') === 'editar') {
      this.formProduto.patchValue(JSON.parse(window.sessionStorage.getItem('u')));
      window.sessionStorage.removeItem('u');
    }
  }

  produtosForm() {
    this.formProduto = new FormGroup({
      procod: new FormControl(this.produto.procod),
      pronom: new FormControl(this.produto.pronom),
      protip: new FormControl(this.produto.protip),
      propre: new FormControl(this.produto.propre)
    });
  }

  salvar() {
    const produto = this.formProduto.value;
    if (produto.procod) {
      this.produtoService.putProdutos(produto)
        .subscribe(res => {
          this.toastr.success('Produto alterado com sucesso!');
          this.router.navigate(['/produto']);
        });
    } else {
      delete produto.procod;
      this.produtoService.postProdutos(produto)
        .subscribe(res => {
          this.toastr.success('Produto cadastrado com sucesso!');
          this.router.navigate(['/produto']);
        });
    }
  }

  cancelar() {
    this.router.navigate(['/produto']);
  }

}
