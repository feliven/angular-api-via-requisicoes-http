import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Container } from '../../componentes/container/container';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';
import { Separador } from '../../componentes/separador/separador';
import { Contato } from '../../componentes/contato/contato';
import { ContatoService } from '../../servicos/contato-service';
import { InterfaceContato } from '../../interfaces/interface-contato';
import { PerfilContato } from '../perfil-contato/perfil-contato';

// import agenda from '../../agenda.json';

@Component({
  selector: 'app-lista-contatos',
  imports: [
    Container,
    Cabecalho,
    Separador,
    Contato,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PerfilContato,
  ],
  templateUrl: './lista-contatos.html',
  styleUrl: './lista-contatos.css',
})
export class ListaContatos implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: InterfaceContato[] = [];

  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contatoService.getContatos().subscribe((listaContatos) => {
      this.contatos = listaContatos;
    });
    // O service está nos retornando um Observable e o componente de lista de contatos está agindo
    // como um Observer (observador) que está querendo ser notificado dessas informações.
    // Para conseguir fazer essa ligação entre Observer e Observable, utilizamos o método subscribe().
  }

  // Remove os acentos de uma string
  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPorTexto(): InterfaceContato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter((contato) => {
      // Compara os nomes sem acentuações
      return this.removerAcentos(contato.nome)
        .toLowerCase()
        .includes(this.removerAcentos(this.filtroPorTexto).toLowerCase());
    });
  }

  filtrarContatosPorLetraInicial(letra: string): InterfaceContato[] {
    return this.filtrarContatosPorTexto().filter((contato) => {
      // Compara a letra inicial sem considerar acentuações
      return this.removerAcentos(contato.nome)
        .toLowerCase()
        .startsWith(this.removerAcentos(letra).toLowerCase());
    });
  }
}
