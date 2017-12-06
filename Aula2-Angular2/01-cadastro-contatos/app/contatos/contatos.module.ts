import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
        ContatoDetalhesComponent
    ],
    exports:[
        ContatosListaComponent
    ],
    providers:[
        ContatoService
    ]
})


export class ContatosModule{}