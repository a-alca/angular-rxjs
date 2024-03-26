import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { LivroComponent } from './componentes/livro/livro.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { ListaLivrosComponent } from './views/lista-livros/lista-livros.component';
import { ModalLivroComponent } from './views/modal-livro/modal-livro.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LivroComponent,
    RodapeComponent,
    ListaLivrosComponent,
    ModalLivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
