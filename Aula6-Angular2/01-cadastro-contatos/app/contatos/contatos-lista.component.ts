import { ContatoService } from './contato-service';
import { Contato } from './contato.model';
import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

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
    contatos: Contato[]=[];
    mensagem: {};
    classesCss:{};
    private currentTimeout:any;
/**usa-se a abordagem de injetar a instancia no construtor, porque 
 * o angular nao vai saber injetar Contato contato = new Contato(),
 * principalmente se ele ja possui dependencias
 */
    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ){
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
        }).catch(err=>{
            console.log('Aconteceu um erro: ', err);
            this.mostrarMensagem({
                tipo:'danger',
                texto:'Ocorreu um erro ao buscar lista de contatos!'
            });
        });
    }

    onDelete(contato:Contato):void{
        this.dialogService.confirm('Deseja deletar o contato '+ contato.nome)
        .then((canDelete:boolean)=>{
            if(canDelete){
                this.contatoService
                .delete(contato)
                .then((c: Contato)=>{
                    this.contatos = this.contatos
                    .filter(c=>c.id!=contato.id);//se user eh usuario da lista, deleta
                    this.mostrarMensagem({
                        tipo:'success',
                        texto:'Contato deletado!'
                    });
                    
                }).catch(err =>{
                    console.log(err);
                    this.mostrarMensagem({
                        tipo:'danger',
                        texto:'Ocorreu um erro ao deletar o contato!'
                    });   
                });
            }
        });
        console.log(contato);
    }

    private mostrarMensagem(mensagem:{tipo:string, texto:string}):void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
            if(mensagem.tipo!='danger'){
            if(this.currentTimeout){
                clearTimeout(this.currentTimeout);
            }
            setTimeout(()=>{
                this.mensagem = undefined;//dps de 3 segundos  a mensagem some.
            },3000);
        }
    }

    private montarClasses(tipo:string):void{
        this.classesCss = {
            'alert': true
            //'alert-success':true
        };
        this.classesCss['alert-'+ tipo]=true;
        //alert-success ou se o tipo for danger, alert-danger
        /**
         * {
         * 'alert':true,
         * 'alert-success':true,
         * 'alert-danger': false,
         * ...
         * }
         */
    }
}