import { ContatoService } from './contato-service';
import { Subject } from 'rxjs/Subject';
import { Contato } from './contato.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'contato-busca',
  templateUrl: 'contato-busca.component.html',
  styles:[
    `.cursor-pointer:hover{
      cursor:pointer;
    }`
  ]
})
export class ContatoBuscaComponent implements OnInit {
  contatos: Observable<Contato[]>;
  /**
   * outro observable, 
   * toda vez que o usuario digita busca, 
   * adiciona a busca no subject, 
   * pq ele gerencia esse fluxo
   * entra na fila
   */ 
  private termosDaBusca: Subject<any>= new Subject<any>();

  constructor(
    private router : Router,
      private contatoService: ContatoService
  ) {}

  ngOnInit():void {
      /**
       * inicializa o observable,
       * chama uma vez, qdo inicia
       * atribui o retorno do contato
       * verifica se vai mesmo fazer a chamada ao servidor
       */
      this.contatos = this.termosDaBusca
      .debounceTime(1200)//300ms pra emitir novo evento
      .distinctUntilChanged() //ignore se o prox termo de busca for igual ao anterior
      .switchMap(term => {
          console.log('Fez a busca', term);
        return term ? this.contatoService.search(term) :
        Observable.of<Contato[]>([]);
  }).catch(err=>{
    console.log(err);
    return Observable.of<Contato[]>([]);
  });
  /**inteligente o bastante para 
   * cancelar os observables de pesquisa anteriores,
   * ele sempre envia a mais recente
   */
      this.contatos.subscribe((contatos:Contato[])=>{
          console.log('retornou do servidor: ',contatos);
      })
  }

  search(termo: string): void {
    console.log(termo);
    this.termosDaBusca.next(termo);
  }

  verDetalheContato(contato:Contato):void{
    let link  = ["contato/save/", contato.id];
    this.router.navigate(link);
  }
}
