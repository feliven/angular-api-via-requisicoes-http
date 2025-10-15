import { Injectable } from '@angular/core';
import { InterfaceContato } from '../interfaces/interface-contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor(private http: HttpClient) {}

  private readonly enderecoAPI = 'http://localhost:3000/contatos';

  getContatos(): Observable<InterfaceContato[]> {
    return this.http.get<InterfaceContato[]>(this.enderecoAPI);
  }

  setContato(contato: InterfaceContato) {
    return this.http.post<InterfaceContato>(this.enderecoAPI, contato);
  }
}
