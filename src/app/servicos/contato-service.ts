import { Injectable } from '@angular/core';
import { InterfaceContato } from '../interfaces/interface-contato';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private contatos: InterfaceContato[] = [
    { id: 1, nome: 'Ana', telefone: '29 278869420' },
    { id: 2, nome: 'Antônio', telefone: '38 128451235' },
    { id: 53, nome: 'Ágata', telefone: '38 128451235' },
    { id: 3, nome: 'Bruno', telefone: '95 695521583' },
    { id: 4, nome: 'Beatriz', telefone: '25 854986459' },
    { id: 5, nome: 'Carlos', telefone: '94 543197849' },
    { id: 6, nome: 'Cláudia', telefone: '31 176437098' },
  ];

  constructor() {
    // obtém contatos salvos no localStorage
    const contatosLSEmString: string | null = localStorage.getItem('contatos');
    const contatosLS: InterfaceContato[] = contatosLSEmString
      ? JSON.parse(contatosLSEmString)
      : [];
    this.contatos = contatosLS || null;

    // salva contatos no localStorage
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  getContatos() {
    return this.contatos;
  }

  setContato(contato: InterfaceContato) {
    this.contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }
}
