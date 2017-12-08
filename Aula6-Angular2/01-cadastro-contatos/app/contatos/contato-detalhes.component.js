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
const contato_model_1 = require("./contato.model");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const core_1 = require("@angular/core");
const contato_service_1 = require("./contato-service");
//import { find } from 'rxjs/operator/find';
let ContatoDetalhesComponent = class ContatoDetalhesComponent {
    constructor(contatosService, route, location) {
        this.contatosService = contatosService;
        this.route = route;
        this.location = location;
        this.isNew = true;
    }
    ngOnInit() {
        console.log('oninit');
        /**one way data-binding: pega um contato da classe
         *e levando para o template, caso o valor seja alterado
         nao interfere na classe*/
        this.contato = new contato_model_1.Contato('', '', '');
        //percorre parametro da rota
        this.route.params.forEach((params) => {
            let id = +params['id'];
            console.log('id');
            if (id) {
                this.isNew = false;
                this.contatosService.find(id)
                    .then((contato) => {
                    console.log(contato);
                    this.contato = contato;
                });
            }
        });
    }
    //Ao inves de usar [ngClass]={...} no html
    getFormGroupClass(isValid, isPristine) {
        return {
            'form-group': true,
            'has-danger': (!isValid && !isPristine),
            'has-success': (isValid && !isPristine)
        };
    }
    getFormControlClass(isValid, isPristine) {
        return {
            'form-control': true,
            'form-control-danger': (!isValid && !isPristine),
            'form-control-success': (isValid && !isPristine)
        };
    }
    onSubmit() {
        let promise;
        console.log('novo: ', this.isNew);
        if (this.isNew) {
            console.log('cadastra contato');
            this.contatosService.create(this.contato);
        }
        else {
            promise = this.contatosService.update(this.contato);
            console.log('altera contato existente');
            console.log(this.contato);
        }
        promise.then(contato => this.goBack());
        /**
         * pega a ultima pagina na pilha de historico
         */
    }
    goBack() {
        this.location.back();
    }
};
ContatoDetalhesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-detalhe',
        templateUrl: 'contato-detalhe.component.html',
        styles: [`
            .ng-valid[required]{
                border:1px solid green;
            }
            .ng-invalid[required]{
                border:1px solid red;
            }
    `],
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.ActivatedRoute,
        common_1.Location])
], ContatoDetalhesComponent);
exports.ContatoDetalhesComponent = ContatoDetalhesComponent;
//# sourceMappingURL=contato-detalhes.component.js.map