import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ContatoBuscaComponent } from './contato-busca.component';
import { ContatoDetalhesComponent } from './contato-detalhes.component';
import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './contato-service';


@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations:[
        ContatosListaComponent,
        ContatoDetalhesComponent,
        ContatoBuscaComponent
    ],
    exports:[
        ContatosListaComponent,
        ContatoBuscaComponent
    ],
    providers:[
        ContatoService
    ]
})


export class ContatosModule{}