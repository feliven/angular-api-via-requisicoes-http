import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
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

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      const idComoNumber = parseInt(id);
      this.contatoService
        .buscarPorID(idComoNumber)
        .subscribe((contato) => this.formularioContato.patchValue(contato));
    }
  }

  salvarContato() {
    const novoContato: InterfaceContato = this.formularioContato.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      const idComoNumber = parseInt(id);
      novoContato.id = idComoNumber;
    }

    if (this.formularioContato.valid) {
      console.log(this.formularioContato.value);
      this.contatoService.criarOuEditarContato(novoContato).subscribe(() => {
        this.formularioContato.reset();
        this.router.navigateByUrl('/lista-contatos');
      });
    } else {
      console.log('FORMULÁRIO INVÀLIDO!!!');
    }
  }

  cancelar() {
    console.log('CANCELLED!');
    this.formularioContato.reset();
    this.router.navigateByUrl('/lista-contatos');
  }
}
