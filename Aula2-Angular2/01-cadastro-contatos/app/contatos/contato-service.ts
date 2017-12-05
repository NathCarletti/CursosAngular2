import {Injectable} from '@angular/core';

import{Contato} from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService{
   /* getContatos(): Contato[] {
        return CONTATOS;
        //Sincrona
    }*/
    //Assincrona: DEVOLVE PROMISE IMEDIATAMENTE AO SERVIDOR
    getContatos():Promise<Contato[]>{
        return Promise.resolve(CONTATOS);
    }
    /*devolve a promise devagar*/
    getContatosSlowly(): Promise<Contato[]>{
        return new Promise((resolve, reject)=>{
            //chama a propria função no momento adequado
            setTimeout(resolve, 3000);
            //mesmo de mandar return this.getContatos()
            }).then(()=>{
                console.log('primeiro then');
                return 'Angular 2';
                })
            .then((param:string)=>{
                console.log('segundo then');
                console.log(param);
                })
            .then(()=>{
                console.log('terceiro then')
                return this.getContatos()
            });
    }
}