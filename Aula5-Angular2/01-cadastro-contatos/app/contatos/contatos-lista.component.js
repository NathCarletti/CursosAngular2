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
const dialog_service_1 = require("./dialog.service");
let ContatosListaComponent = class ContatosListaComponent {
    /**usa-se a abordagem de injetar a instancia no construtor, porque
     * o angular nao vai saber injetar Contato contato = new Contato(),
     * principalmente se ele ja possui dependencias
     */
    constructor(contatoService, dialogService) {
        /**
         * Não executar onInit aqui no construtor
         */
        this.contatoService = contatoService;
        this.dialogService = dialogService;
        this.contatos = [];
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
        }).catch(err => {
            console.log('Aconteceu um erro: ', err);
            this.mostrarMensagem({
                tipo: 'danger',
                texto: 'Ocorreu um erro ao buscar lista de contatos!'
            });
        });
    }
    onDelete(contato) {
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome)
            .then((canDelete) => {
            if (canDelete) {
                this.contatoService
                    .delete(contato)
                    .then((c) => {
                    this.contatos = this.contatos
                        .filter(c => c.id != contato.id); //se user eh usuario da lista, deleta
                    this.mostrarMensagem({
                        tipo: 'success',
                        texto: 'Contato deletado!'
                    });
                }).catch(err => {
                    console.log(err);
                    this.mostrarMensagem({
                        tipo: 'danger',
                        texto: 'Ocorreu um erro ao deletar o contato!'
                    });
                });
            }
        });
        console.log(contato);
    }
    mostrarMensagem(mensagem) {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
            }
            setTimeout(() => {
                this.mensagem = undefined; //dps de 3 segundos  a mensagem some.
            }, 3000);
        }
    }
    montarClasses(tipo) {
        this.classesCss = {
            'alert': true
            //'alert-success':true
        };
        this.classesCss['alert-' + tipo] = true;
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
    __metadata("design:paramtypes", [typeof (_a = typeof contato_service_1.ContatoService !== "undefined" && contato_service_1.ContatoService) === "function" && _a || Object, dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
var _a;
//# sourceMappingURL=contatos-lista.component.js.map