import { Item } from './../../models/interfaces';
import { map, switchMap, tap, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';


const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  // listaLivros: Livro[];
  campoBusca = new FormControl();
  // subscription: Subscription // REFATORADO NO TAMPLATE COM O PIPE ASYNC
  // livro: Livro

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('fluxo inicial')),
      distinctUntilChanged(),//Operador de filtragem. Retorna um Observable que emite todos os valores enviados pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map((items) => this.livrosResultadoParaLivros(items)) //
    )

  // O METODO BUSCARLIVROS FOI REFATORADO NO SWITCHMAP PARA SER BUSCADO POR VALOR DIGITADO PELO USER
  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       this.listaLivros = this.livrosResultadoParaLivros(items)
  //     },
  //     error: erro => console.error(erro),
  //   })
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
  // NAO E NECESSARIO MAIS O UNSUBSCRIBE MANUALMENTE POIS A REFATORACAO NO TAMPLATE LISTA-LIVROS.COMPONENT.HTML COM O PIPE: | async  QUE QUANDO O COMPONENTE FOR ENCERRADO ESSE PIPE ASYNC EFETUARA O UNSUBSCRIBE.
  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}
