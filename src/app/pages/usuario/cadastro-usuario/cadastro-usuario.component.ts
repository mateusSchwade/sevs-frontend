import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(
    private homeService: HomeServiceService,
    private usuariosService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public formUsuario: FormGroup;
  public usuario = { usucod: null, usunom: null, ususen: null, usuema: null, usucpf: null, senha: null, usutip: null };


  ngOnInit() {
    this.usuariosForm();
    this.usuario = JSON.parse(this.homeService.getUsuarioLogado());
    if (this.route.snapshot.paramMap.get('acao') === 'editar') {
      const usu = JSON.parse(window.sessionStorage.getItem('u'));
      usu.ususen = atob(usu.ususen);
      this.formUsuario.patchValue(usu);
      this.formUsuario.patchValue({senha: usu.ususen});
      window.sessionStorage.removeItem('u');
    }
  }

  usuariosForm() {
    this.formUsuario = new FormGroup({
      usucod: new FormControl(this.usuario.usucod),
      usunom: new FormControl(this.usuario.usunom),
      ususen: new FormControl(this.usuario.ususen),
      usuema: new FormControl(this.usuario.usuema),
      usucpf: new FormControl(this.usuario.usucpf),
      senha: new FormControl(this.usuario.senha),
      usutip: new FormControl(this.usuario.usutip)
    });
  }

  salvar() {
    if (this.formUsuario.valid && this.formUsuario.value.ususen === this.formUsuario.value.senha) {
      const usuario = this.formUsuario.value;
      usuario.ususen = btoa(usuario.ususen);
      delete usuario.senha;
      if (usuario.usucod) {
        this.usuariosService.putUsuario(usuario)
          .subscribe(res => {
            this.toastr.success('Usuário alterado com sucesso!');
            this.router.navigate(['/usuarios']);
          });
      } else {
        delete usuario.usucod;
        this.usuariosService.postUsuario(usuario)
          .subscribe(res => {
            this.toastr.success('Usuário cadastrado com sucesso!');
            this.router.navigate(['/usuarios']);
          });
      }
    } else {
      this.toastr.info('Senhas não conferem, ou campos não preenchidos!');
    }
  }
  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
