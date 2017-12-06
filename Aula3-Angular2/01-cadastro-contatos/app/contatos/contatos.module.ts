import { ContatoDetalhesComponent } from './contato-detalhes.component';
import { CommonModule } from '@angular/common';
import { ContatosListaComponent } from './contatos-lista.component';
import { NgModule } from '@angular/core';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './contato-service';

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
    ],
    providers:[
        ContatoService
    ]
})


export class ContatosModule{}