import { Contato } from './contatos/contato.model';
import {InMemoryDbService} from 'angular-in-memory-web-api';



export class InMemoryDataService implements InMemoryDbService{
    createDb():{}{
        let contatos:  Contato[]=[
            
            {id: 1, nome:'Fulano', email: 'fulano@gmail', telefone:'0000'},
            {id: 2, nome:'detal', email: 'detal@gmail', telefone:'9999'},
            {id: 3, nome:'jose', email: 'jose@gmail', telefone:'8888'},
            {id: 4, nome:'joao', email: 'joao@gmail', telefone:'7777'},
            {id: 5, nome:'maria', email: 'maria@gmail', telefone:'6666'},
            
            ];

            let carros:any[] = [
                {id:0, descricao:'Camaro'},
                {id:1, descricao:'Mustang'}
            ];
            return {
                'contatos': contatos,
                'carros':carros
            };
    }

}