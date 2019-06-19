import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroUsuarioComponent } from './pages/usuario/cadastro-usuario/cadastro-usuario.component';
import { ListUsuarioComponent } from './pages/usuario/list-usuario/list-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './service/usuario/usuario.service';
import { HomeServiceService } from './service/home-service.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PedidosListaComponent } from './pages/pedidos/pedidos-lista/pedidos-lista.component';
import { PedidosCadastroComponent } from './pages/pedidos/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosService } from './service/firebase/pedidos/pedidos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { ProdutoCadastrarComponent } from './pages/produto/produto-cadastrar/produto-cadastrar.component';
import { ProdutoService } from './service/produto/produto.service';
import { NgxCurrencyModule, CurrencyMaskDirective } from 'ngx-currency';
import { PerfilComponent } from './pages/usuario/perfil/perfil.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { PdfmakeService } from './service/pdfmake/pdfmake.service';
import { Relatorios } from './utils/relatorios';
import { FormataCpf } from './utils/formata-cpf';
import { FormataValor } from './utils/formata-valor';

const firebaseConfig = {
  apiKey: 'AIzaSyB4gCIu-nwVewWPR7vWP578XlfHT-kNsns',
  authDomain: 'sevs-pedidos.firebaseapp.com',
  databaseURL: 'https://sevs-pedidos.firebaseio.com',
  projectId: 'sevs-pedidos',
  storageBucket: 'sevs-pedidos.appspot.com',
  messagingSenderId: '790372950916',
  appId: '1:790372950916:web:7b12065f1f46a8e9'
};

// tslint:disable-next-line: prefer-const
let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroUsuarioComponent,
    ListUsuarioComponent,
    PedidosListaComponent,
    PedidosCadastroComponent,
    LoginComponent,
    ProdutoListComponent,
    ProdutoCadastrarComponent,
    PerfilComponent,
    GraficosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(options),
    NgbModule,
    NgxCurrencyModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [
    UsuarioService,
    HomeServiceService,
    PedidosService,
    AuthGuardService,
    ProdutoService,
    PdfmakeService,
    Relatorios,
    FormataCpf,
    FormataValor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
