import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public login = { usuema: null, ususen: null };
  public formLogin: FormGroup;

  ngOnInit() {
    this.loginForm();
  }

  loginForm() {
    this.formLogin = new FormGroup({
      ususen: new FormControl(this.login.ususen),
      usuema: new FormControl(this.login.usuema)
    });
  }

  autenticar() {
    const usuario = this.formLogin.value;
    usuario.ususen = btoa(usuario.ususen);
    console.log(usuario);
    this.usuarioService.postAutenticar(usuario)
      .subscribe(res => {
        this.toastr.success('Bem Vindo!');
        window.sessionStorage.setItem('usuarioLogado', JSON.stringify(res));
        this.router.navigate(['']);
      }, error => {
        this.toastr.error('Usuario ou senha incorretos');
        console.log(error);
      });
  }

}
