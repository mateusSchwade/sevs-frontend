import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfmakeService } from 'src/app/service/pdfmake/pdfmake.service';
import { Relatorios } from 'src/app/utils/relatorios';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private pdfMake: PdfmakeService,
    private relatorios: Relatorios
  ) { }

  public usuariosList;
  public user;

  ngOnInit() {
    this.getUsuariosAll();
  }

  getUsuariosAll() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuariosList = res;
      });
  }

  editar(usuario) {
    window.sessionStorage.setItem('u', JSON.stringify(usuario));
    this.router.navigate(['/usuarios/editar']);
  }

  excluir(usuario, content) {
    this.user = usuario;
    const modalRef: any = this.modalService.open(content);
    modalRef.result.then(res => {
      this.usuarioService.deleteUsuario(usuario.usucod)
        .subscribe(res => {
          this.toastr.success('Usuario Excluido com sucesso!');
          this.getUsuariosAll();
        });
    }, error => { });
  }

  gerarRelatorio() {
    const relatorio = this.relatorios.usuarios(this.usuariosList);
    this.pdfMake.gerarPdf(relatorio);
  }

}
