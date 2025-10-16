import { Component, OnInit } from '@angular/core';
import { Container } from '../../componentes/container/container';
import { Separador } from '../../componentes/separador/separador';
import { InterfaceContato } from '../../interfaces/interface-contato';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-contato',
  imports: [Container, Separador],
  templateUrl: './perfil-contato.html',
  styleUrl: './perfil-contato.css',
})
export class PerfilContato implements OnInit {
  contato: InterfaceContato = {
    id: 0,
    nome: 'eu',
    telefone: '1234',
    email: 'eu@eu',
    aniversario: '10/10/1910',
    redes: 'eu.com',
  };

  constructor(private activatedRoute: ActivatedRoute) {
    //
  }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.get('id');
  }
}
