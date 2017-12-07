import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/toPromise";
import { CONTATOS } from "./contatos-mock";
import { Contato } from "./contato.model";
import { Observable } from "rxjs";


@Injectable()
export class ContatoService {
  /* getContatos(): Contato[] {
        return CONTATOS;
        //Sincrona
    }*/

  private contatosUrl: string = "api/contatos"; //onde está a lista de contatos.
  private headers: Headers = new Headers({
    "Content-Type": "application/json"
  });
  constructor(private http: Http) {}

  //Assincrona: DEVOLVE PROMISE IMEDIATAMENTE AO SERVIDOR
  getContatos(): Promise<Contato[]> {
    return this.http
      .get(this.contatosUrl)
      .toPromise()
      .then(response => response.json().data as Contato[])
      .catch(this.handleError);
  }

  getContatoPorId(id: number): Promise<Contato> {
    return this.getContatos().then((contato: Contato[]) =>
        contato.find(contato => contato.id === id)
    );
  }

  create(contato: Contato): Promise<Contato> {
    return this.http
      .post(this.contatosUrl, JSON.stringify(contato), {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        console.log('res:',response.json().data);
        return response.json().data as Contato;
      })
      .catch(this.handleError);
  }

  update(contato:Contato):Promise<Contato>{
    const url = `${this.contatosUrl}/${contato.id}`;//app/contatos/:id
    return this.http
    .put(url, JSON.stringify(contato), {
      headers: this.headers
    })
    .toPromise()
    .then(() => contato as Contato)
  
    .catch(this.handleError);
  }

  delete(contato:Contato):Promise<Contato>{
    const url = `${this.contatosUrl}/${contato.id}`;//app/contatos/:id
    return this.http
    .delete(url, {
      headers: this.headers
    })
    .toPromise()
    .then(() => contato as Contato)
    .catch(this.handleError);
  }
  private handleError(err: any): Promise<any> {
    console.log("Error:", err);
    return Promise.reject(err.message || err);
  }

  /*devolve a promise devagar*/
  getContatosSlowly(): Promise<Contato[]> {
    return new Promise((resolve, reject) => {
      // espera 2 segundo e entao chama o then
      setTimeout(resolve, 2000);
      //mesmo de mandar return this.getContatos()
    })
      .then(() => {
        console.log("primeiro then");
        return "Angular 2";
      })
      .then((param: string) => {
        console.log("segundo then");
        console.log(param);

        return new Promise((resolve2, reject2) => {
          setTimeout(() => {
            console.log("continua dps de 2 segundos");
            resolve2();
          }, 2000);
        });
      })
      .then(() => {
        console.log("terceiro then");
        return this.getContatos();
      });
  }

  search(term:string):Observable<Contato[]>{
  return this.http
  .get(`${this.contatosUrl}/?nome=${term}`)
  //converter observable em contatos[]
  .map((res:Response)=> res.json().data as Contato[]);

  }
}
