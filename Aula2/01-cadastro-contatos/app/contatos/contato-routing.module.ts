import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoDetalhesComponent } from './contato.detalhes.component';


const contatoRoutes: Routes = [
{
    path:'contato',
    component: ContatosListaComponent
},
{
    path:'contato/save',
    component:ContatoDetalhesComponent
}
]

@NgModule({
    imports:[
        RouterModule.forChild(contatoRoutes)
    ]
})

export class ContatoRoutingModule{}