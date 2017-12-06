import { ContatoService } from './contato-service';
import { Contato } from './contato.model';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
    /**Posso instanciar o provider aqui ou 
     * no contatos-module(caso dados compartilhados por toda app)
     * providers:[ContatoService]
     */
})

export class ContatosListaComponent implements OnInit{
    contatos: Contato[];
/**usa-se a abordagem de injetar a instancia no construtor, porque 
 * o angular nao vai saber injetar Contato contato = new Contato(),
 * principalmente se ele ja possui dependencias
 */
    constructor(private contatoService: ContatoService){
        /**
         * Não executar onInit aqui no construtor
         */
    }

    ngOnInit(): void{
       //sincrona this.contatos = this.contatoService.getContatos();
        //assincrona
       //sincrona this.contatoService.getContatos()
        this.contatoService.getContatosSlowly()
       .then((contatos:Contato[])=>{
            //possui sintaxe mais curta q uma funçao normal do js
            //nao faz bind para o proprio this<<arrowfunctions>>
            this.contatos = contatos;
        }).catch(err=>console.log(err));
    }
}