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
    
    constructor(
        private contatosService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){}
    
    ngOnInit(): void{
        console.log('oninit');
        this.route.params.forEach((params:Params)=>{
        let id:number= +params['id'];
        console.log('id');
        this.contatosService.getContatoPorId(id)
            .then((contato:Contato)=>{
                console.log(contato);
            })
        });       
    }
}