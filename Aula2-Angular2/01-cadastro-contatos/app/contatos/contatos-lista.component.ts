import { Contato } from './contato.model';
import { Component } from '@angular/core';
import { CONTATOS } from './contatos-mock';

@Component({
    moduleId:module.id,
    selector:'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})

export class ContatosListaComponent{
    contatos: Contato[] = CONTATOS;
}