import { ContatoService } from './contato-service';
import { Subject } from 'rxjs/Subject';
import { Contato } from './contato.model';
import { Observable } from 'rxjs/Observable';
import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
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
export class ContatoBuscaComponent implements OnInit, OnChanges {
 
  @Input() busca: string;
  @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
  //in inOutput === [in]="" (inOutput)="" ou apenas [(in)]="" 
  //POREM tem q ser Change x e xChange, obrigtoriamente
  contatos: Observable<Contato[]>;
  private termosDaBusca: Subject<any>= new Subject<any>();
 /**
   * outro observable, 
   * toda vez que o usuario digita busca, 
   * adiciona a busca no subject, 
   * pq ele gerencia esse fluxo
   * entra na fila
   */ 


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
/**
 * ciclos de vida:
 * onChanges ouve todas as alterações dos campos marcados
 * com Input
 * @param changes 
 */
  ngOnChanges(changes: SimpleChanges):void{
    let busca: SimpleChange = changes['busca'];
    console.log(changes);
    this.search(busca.currentValue)
  }

  search(termo: string): void {
    console.log(termo);
    this.termosDaBusca.next(termo);
    this.buscaChange.emit(termo);
  }

  verDetalheContato(contato:Contato):void{
    let link  = ["contato/save/", contato.id];
    this.router.navigate(link);
    this.buscaChange.emit('');
  }
}
