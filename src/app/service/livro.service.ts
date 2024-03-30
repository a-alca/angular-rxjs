import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> { //DE TIPO ANY PARA LIVROSRESULTADO DA INTERFACE LivrosResultado
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get<LivrosResultado>(this.API, { params }).pipe( // O PIPE É O OPERADOR QUE VAI SERVIR PARA AGRUPAR DIVERSOS OUTROS OPERADORES, COMO SE FOSSE UM CANO ONDE PASSAM AS INFROMACOES.
      tap((retornoAPI) => console.log('fluxoTap', retornoAPI)), // O OPERADOR TAP NAO MODIFICA OS DADOS, SERVE APENAS PARA VISUALIZA-LOS (DEBUGAR).
      map(resultado => resultado.items), // O OPERADOR MAP RECEBE OS DADOS DO OBSERVABLE, TRANSFOMA OS DADOS E EH DIRECIONADO AO OBSERVER
      tap(resultado => console.log('fluxo apos o map', resultado)),
    )
  }
}
