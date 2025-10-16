import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [CommonModule, RouterLink],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  @Input() titulo: string = '';
  @Input() bannerSrc: string = '';
  @Input() telaInicial: boolean = false;
}
