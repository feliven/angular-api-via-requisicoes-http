import { Component, OnInit } from '@angular/core';
import { Container } from '../../componentes/container/container';
import { Separador } from '../../componentes/separador/separador';
import { InterfaceContato } from '../../interfaces/interface-contato';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../servicos/contato-service';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';

@Component({
  selector: 'app-perfil-contato',
  imports: [Container, Separador, Cabecalho],
  templateUrl: './perfil-contato.html',
  styleUrl: './perfil-contato.css',
})
export class PerfilContato implements OnInit {
  contato: InterfaceContato = {
    id: 0,
    nome: 'eu',
    avatar: '',
    telefone: '1234',
    email: 'eu@eu',
    aniversario: '1910-10-10',
    redes: 'eu.com',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      const idComoNumber = parseInt(id);
      this.contatoService
        .buscarPorID(idComoNumber)
        .subscribe((contato) => (this.contato = contato));
    }
  }

  excluirContato() {
    this.contatoService
      .excluirContato(this.contato.id)
      .subscribe(() => this.router.navigateByUrl('/lista-contatos'));
  }
}
