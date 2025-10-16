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
import { MensagemErro } from '../../componentes/mensagem-erro/mensagem-erro';

@Component({
  selector: 'app-formulario-contato',
  imports: [
    CommonModule,
    Container,
    Separador,
    ReactiveFormsModule,
    RouterLink,
    MensagemErro,
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
      avatar: new FormControl(''),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      aniversario: new FormControl('02/02/2020'),
      redes: new FormControl('twiter'),
      observacoes: new FormControl('hello world'),
    });
  }

  getFormControl(nome: string): FormControl {
    const control = this.formularioContato.get(nome);
    if (!control) {
      throw new Error('Controle do formulário não encontrado: ' + nome);
    }
    return control as FormControl;
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

  aoSelecionarArquivo(evento: Event) {
    const eventoTarget = evento.target as HTMLInputElement;
    if (eventoTarget.files) {
      const imagem: File = eventoTarget.files[0];
      this.lerArquivo(imagem);
    }
  }

  lerArquivo(arquivo: File) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.formularioContato.get('avatar')?.setValue(reader.result);
      }
    };
    reader.readAsDataURL(arquivo);
  }

  cancelar() {
    console.log('CANCELLED!');
    this.formularioContato.reset();
    this.router.navigateByUrl('/lista-contatos');
  }
}
