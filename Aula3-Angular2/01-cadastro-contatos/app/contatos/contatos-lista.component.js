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
const contato_service_1 = require("./contato-service");
const core_1 = require("@angular/core");
let ContatosListaComponent = class ContatosListaComponent {
    /**usa-se a abordagem de injetar a instancia no construtor, porque
     * o angular nao vai saber injetar Contato contato = new Contato(),
     * principalmente se ele ja possui dependencias
     */
    constructor(contatoService) {
        this.contatoService = contatoService;
        /**
         * Não executar onInit aqui no construtor
         */
    }
    ngOnInit() {
        //sincrona this.contatos = this.contatoService.getContatos();
        //assincrona
        //sincrona this.contatoService.getContatos()
        this.contatoService.getContatosSlowly()
            .then((contatos) => {
            //possui sintaxe mais curta q uma funçao normal do js
            //nao faz bind para o proprio this<<arrowfunctions>>
            this.contatos = contatos;
        }).catch(err => console.log(err));
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contatos-lista',
        templateUrl: 'contatos-lista.component.html'
        /**Posso instanciar o provider aqui ou
         * no contatos-module(caso dados compartilhados por toda app)
         * providers:[ContatoService]
         */
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map