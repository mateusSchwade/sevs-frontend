import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(): boolean {

    if (window.sessionStorage.getItem('usuarioLogado') != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('Para acessar está pagina e necessário estar logado!');
      return false;
    }
  }

}
