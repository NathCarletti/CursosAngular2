"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        /* getContatos(): Contato[] {
              return CONTATOS;
              //Sincrona
          }*/
        this.contatosUrl = "api/contatos"; //onde está a lista de contatos.
        this.headers = new http_1.Headers({
            "Content-Type": "application/json"
        });
    }
    //Assincrona: DEVOLVE PROMISE IMEDIATAMENTE AO SERVIDOR
    getContatos() {
        return this.http
            .get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    getContatoPorId(id) {
        return this.getContatos().then((contato) => contato.find(contato => contato.id === id));
    }
    create(contato) {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {
            headers: this.headers
        })
            .toPromise()
            .then((response) => {
            console.log('res:', response.json().data);
            return response.json().data;
        })
            .catch(this.handleError);
    }
    update(contato) {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {
            headers: this.headers
        })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    delete(contato) {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .delete(url, {
            headers: this.headers
        })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    handleError(err) {
        console.log("Error:", err);
        return Promise.reject(err.message || err);
    }
    /*devolve a promise devagar*/
    getContatosSlowly() {
        return new Promise((resolve, reject) => {
            // espera 2 segundo e entao chama o then
            setTimeout(resolve, 2000);
            //mesmo de mandar return this.getContatos()
        })
            .then(() => {
            console.log("primeiro then");
            return "Angular 2";
        })
            .then((param) => {
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
    search(term) {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res) => res.json().data);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato-service.js.map