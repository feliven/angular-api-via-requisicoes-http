import { Routes } from '@angular/router';
import { FormularioContato } from './paginas/formulario-contato/formulario-contato';
import { ListaContatos } from './paginas/lista-contatos/lista-contatos';
import { PerfilContato } from './paginas/perfil-contato/perfil-contato';

export const routes: Routes = [
  {
    path: 'formulario',
    component: FormularioContato,
  },
  {
    path: 'lista-contatos',
    component: ListaContatos,
  },
  {
    path: 'perfil-contato/:id',
    component: PerfilContato,
  },
  {
    path: '',
    redirectTo: '/lista-contatos',
    pathMatch: 'full',
  },
];
