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
const Subject_1 = require("rxjs/Subject");
const Observable_1 = require("rxjs/Observable");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    /**
      * outro observable,
      * toda vez que o usuario digita busca,
      * adiciona a busca no subject,
      * pq ele gerencia esse fluxo
      * entra na fila
      */
    constructor(router, contatoService) {
        this.router = router;
        this.contatoService = contatoService;
        this.buscaChange = new core_1.EventEmitter();
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        /**
         * inicializa o observable,
         * chama uma vez, qdo inicia
         * atribui o retorno do contato
         * verifica se vai mesmo fazer a chamada ao servidor
         */
        this.contatos = this.termosDaBusca
            .debounceTime(1200) //300ms pra emitir novo evento
            .distinctUntilChanged() //ignore se o prox termo de busca for igual ao anterior
            .switchMap(term => {
            console.log('Fez a busca', term);
            return term ? this.contatoService.search(term) :
                Observable_1.Observable.of([]);
        }).catch(err => {
            console.log(err);
            return Observable_1.Observable.of([]);
        });
        /**inteligente o bastante para
         * cancelar os observables de pesquisa anteriores,
         * ele sempre envia a mais recente
         */
        this.contatos.subscribe((contatos) => {
            console.log('retornou do servidor: ', contatos);
        });
    }
    /**
     * ciclos de vida:
     * onChanges ouve todas as alterações dos campos marcados
     * com Input
     * @param changes
     */
    ngOnChanges(changes) {
        let busca = changes['busca'];
        console.log(changes);
        this.search(busca.currentValue);
    }
    search(termo) {
        console.log(termo);
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }
    verDetalheContato(contato) {
        let link = ["contato/save/", contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscaChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html',
        styles: [
            `.cursor-pointer:hover{
      cursor:pointer;
    }`
        ]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        contato_service_1.ContatoService])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map