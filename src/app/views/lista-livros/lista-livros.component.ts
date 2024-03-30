import { ImageLinks, Item } from './../../models/interfaces';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      //NOTIFICACOES QUE SAO EMITIDAS PELO OBSERVABLE https://rxjs.dev/guide/observable#executing-observables:
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items)
      }, //next NOTIFICACAO EMITIDA PELO OBSERVABLE O RETORNO DA API DE BUSACA LIVROS
      error: erro => console.error(erro), //EMITE ERRO QUE RETORNA INFORMACOES DE CODIGO DE ERRO, STATUS, INFORMACOES GERAIS SOBRE ERRO HTTPERRORRESPONSE, POR EXEMPLO.
      // complete: () => console.log('observable completado') // ESSA NOTIFICACAO NAO RETORNA NENHUM DADO, APENAS COMPLETA O CICLO DE VIDA DO OBSERVABLE.
    }
      //PARA PASSAR ARGUMENTOS SEMPARADOS NO SUBSCRIBE, EH PRECISO PASSAR NOTIFICACOES QUE SAO EMITEDAS PELO OBSERVABLE COMO ACIMA
      // (retornoAPI) => console.log(retornoAPI),
      // (error) => console.log(error)
    )
  }
//COLA RxJS:
//    .subscribe(data => this.config = {
//      heroesUrl: (data as any).heroesUrl,
//      textfile:  (data as any).textfile,
//    });

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe() //O UNSUBSCRIBE EH UM METODO DO SUBSCROPTION, ELE NAO RECEBE ARGUMENTOS, APENAS ENCERRA A INSCRICAO(SUBSCRIBE) NO OBSERVABLE
  }
}
