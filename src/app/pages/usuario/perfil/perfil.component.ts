import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from 'src/app/service/home-service.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private homeService: HomeServiceService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  public formUsuario: FormGroup;
  public usuario = { usucod: null, usunom: null, ususen: null, usuema: null, usucpf: null, senha: null, usutip: null };

  ngOnInit() {
    this.getUsuario(JSON.parse(this.homeService.getUsuarioLogado()));
    this.usuariosForm();
  }

  getUsuario(usuario) {
    this.usuarioService.getUsuario(usuario.usucod)
      .subscribe(res => {
        const user: any = res;
        user.ususen = atob(user.ususen);
        user.senha = user.ususen;
        this.formUsuario.patchValue(user);
      });
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
      delete usuario.senha;
      usuario.ususen = btoa(usuario.ususen);
      this.usuarioService.putUsuario(usuario)
        .subscribe(res => {
          this.toastr.success('Perfil alterado com sucesso!');
          this.router.navigate(['/']);
        });
    } else {
      this.toastr.info('Senhas não conferem, ou campos não preenchidos!');
    }
  }
  cancelar() {
    this.router.navigate(['/']);
  }

}
