import { Contato } from './contato.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { ContatoService } from './contato-service';
//import { find } from 'rxjs/operator/find';


@Component({
    moduleId: module.id,
    selector:'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html',
    styles: [`
            .ng-valid[required]{
                border:1px solid green;
            }
            .ng-invalid[required]{
                border:1px solid red;
            }
    `],
    /*styleUrls:[
        'contato-detalhes.component.css'
    ]*/
})

export class ContatoDetalhesComponent implements OnInit{
    
    contato:Contato;
    private isNew :boolean = true;

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
        this.contato = new Contato('','','');
       //percorre parametro da rota
        this.route.params.forEach((params:Params)=>{
            let id:number= +params['id'];
            console.log('id');
            if(id){
                this.isNew=false;

                this.contatosService.find(id)
                .then((contato:Contato)=>{
                    console.log(contato);
                    this.contato = contato;
                });
            }
        }); 
        
              
    }
    //Ao inves de usar [ngClass]={...} no html
    getFormGroupClass(isValid: boolean, isPristine: boolean):{}{
        return{
            'form-group':true,
            'has-danger': (!isValid && !isPristine),
            'has-success': (isValid && !isPristine)
        };
    }


    getFormControlClass(isValid: boolean, isPristine: boolean):{}{
        return{
            'form-control':true,
            'form-control-danger': (!isValid && !isPristine),
            'form-control-success': (isValid && !isPristine)
        };
    }

    onSubmit():void{
        let promise;

        console.log('novo: ',this.isNew);
        if(this.isNew){
            console.log('cadastra contato');
            this.contatosService.create(this.contato);
        }else{
            promise = this.contatosService.update(this.contato);
            console.log('altera contato existente');
            console.log(this.contato);
        }
        promise.then(contato=> this.goBack());
        /**
         * pega a ultima pagina na pilha de historico
         */
    }

    goBack():void{
        this.location.back();
    }

    /*teste():void{
        console.log();
    } teste do botao log, atualizado para o onSubmit*/
}