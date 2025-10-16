import { Component, Input, inputBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, RouterLink],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  @Input() nome: string = '';
  @Input() telefone: string = '';
  @Input() id?: number;
}
