import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListUsuarioComponent } from './pages/usuario/list-usuario/list-usuario.component';
import { CadastroUsuarioComponent } from './pages/usuario/cadastro-usuario/cadastro-usuario.component';
import { PedidosListaComponent } from './pages/pedidos/pedidos-lista/pedidos-lista.component';
import { PedidosCadastroComponent } from './pages/pedidos/pedidos-cadastro/pedidos-cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { ProdutoCadastrarComponent } from './pages/produto/produto-cadastrar/produto-cadastrar.component';
import { PerfilComponent } from './pages/usuario/perfil/perfil.component';
import { GraficosComponent } from './pages/graficos/graficos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
      { path: 'usuarios', canActivate: [AuthGuardService], component: ListUsuarioComponent },
      { path: 'usuarios/:acao', canActivate: [AuthGuardService], component: CadastroUsuarioComponent },
      { path: 'pedidos', canActivate: [AuthGuardService], component: PedidosListaComponent },
      { path: 'pedidos/:acao', canActivate: [AuthGuardService], component: PedidosCadastroComponent },
      { path: 'produto', canActivate: [AuthGuardService], component: ProdutoListComponent },
      { path: 'produto/:acao', canActivate: [AuthGuardService], component: ProdutoCadastrarComponent },
      { path: 'perfil', canActivate: [AuthGuardService], component: PerfilComponent },
      { path: 'graficos', canActivate: [AuthGuardService], component: GraficosComponent }
    ]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

