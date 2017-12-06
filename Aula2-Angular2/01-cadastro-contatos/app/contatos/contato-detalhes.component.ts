import { Contato } from './contato.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { ContatoService } from './contato-service';


@Component({
    moduleId: module.id,
    selector:'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html'
})

export class ContatoDetalhesComponent implements OnInit{
    
    contato:Contato;

    constructor(
        private contatosService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){}
    
    ngOnInit(): void{
        console.log('oninit');
        /**one way data-binding: pega um contato da classe
         *e levando para o template, caso o valor seja alterado
         nao interfere na classe*/ 
        this.contato = new Contato(0,'','','');
        this.route.params.forEach((params:Params)=>{
            let id:number= +params['id'];
            console.log('id');
            if(id){
                this.contatosService.getContatoPorId(id)
                .then((contato:Contato)=>{
                    console.log(contato);
                    this.contato = contato;
                });
            }
        }); 
        
              
    }

    teste():void{
        console.log();
    }
}