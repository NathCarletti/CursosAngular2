import { ContatoDetalhesComponent } from './contato.detalhes.component';
import { CommonModule } from '@angular/common';
import { ContatosListaComponent } from './contatos-lista.component';
import { NgModule } from '@angular/core';
import { ContatoRoutingModule } from './contato-routing.module';

@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule
    ],
  declarations:[
      ContatosListaComponent,
      ContatoDetalhesComponent
  ],
  exports:[
    ContatosListaComponent
  ]
})


export class ContatosModule{}