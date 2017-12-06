import {Injectable} from '@angular/core';

import { CONTATOS } from './contatos-mock';
import { Contato } from './contato.model';

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

    getContatoPorId(id:number): Promise<Contato>{
        return  this.getContatos()
        .then((contato:Contato[])=>contato.find((contato)=>contato.id === id));
        
    }

   
    /*devolve a promise devagar*/
    getContatosSlowly(): Promise<Contato[]>{
        return new Promise((resolve, reject)=>{
            //chama a propria função no momento adequado
            setTimeout(resolve, 2000);
            //mesmo de mandar return this.getContatos()
            }).then(()=>{
                console.log('primeiro then');
                return 'Angular 2';
                })
            .then((param:string)=>{
                console.log('segundo then');
                console.log(param);
                   
               return new Promise((resolve2, reject2)=>{
                    setTimeout(()=>{
                        console.log('continua dps de 2 segundos');
                        resolve2();
                    },2000);
                });
                })
            .then(()=>{
                console.log('terceiro then')
                return this.getContatos()
            });
    }
}