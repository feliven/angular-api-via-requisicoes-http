import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Container } from '../../componentes/container/container';
import { Separador } from '../../componentes/separador/separador';
import { ContatoService } from '../../servicos/contato-service';
import { InterfaceContato } from '../../interfaces/interface-contato';

@Component({
  selector: 'app-formulario-contato',
  imports: [
    CommonModule,
    Container,
    Separador,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './formulario-contato.html',
  styleUrl: './formulario-contato.css',
})
export class FormularioContato implements OnInit {
  formularioContato!: FormGroup;

  constructor(private contatoService: ContatoService, private router: Router) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formularioContato = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      aniversario: new FormControl('02/02/2020'),
      redes: new FormControl('twiter'),
      observacoes: new FormControl('hello world'),
    });
  }

  salvarContato() {
    if (this.formularioContato.valid) {
      console.log(this.formularioContato.value);
      const novoContato: InterfaceContato = this.formularioContato.value;
      this.contatoService.setContato(novoContato);
      this.formularioContato.reset();
      this.router.navigateByUrl('/lista-contatos');
    } else {
      console.log('FORMULÁRIO INVÀLIDO!!!');
    }
  }

  cancelar() {
    console.log('CANCELLED!');
    this.formularioContato.reset();
  }
}
