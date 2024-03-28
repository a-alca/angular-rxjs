import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> { //DE TIPO ANY PARA LIVROSRESULTADO DA INTERFACE LivrosResultado
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get(this.API, { params }) //depois que mudei o tipo do observable de <any> para <LivrosResultado>, aqui acusou erro pois o O tipo 'Object' não tem as propriedades a seguir do tipo 'LivrosResultado': items, totalItens.
  }
}
