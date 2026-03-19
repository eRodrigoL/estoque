import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { PayloadProduto, Produto } from '@app/shared/interfaces/produto';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/produtos';

  getAll(busca?: string) {
    let params = new HttpParams();

    if (busca) {
      params = params.set('q', busca);
    }

    return this.http.get<Produto[]>(this.apiUrl, { params }).pipe(delay(2000));
  }

  getById(id: number | string) {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  create(payload: PayloadProduto) {
    return this.http.put<Produto>(this.apiUrl, payload);
  }

  update(id: number, payload: PayloadProduto) {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
