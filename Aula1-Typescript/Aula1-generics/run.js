"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animal_1 = require("../Aula1-classes/Animal");
var dao_1 = require("./dao");
var Cavalo_1 = require("../Aula1-classes/Cavalo");
var dao = new dao_1.Dao();
var animal = new Animal_1.Animal('Rex');
var cavalo = new Cavalo_1.Cavalo('Titã');
dao.insert(animal);
//# sourceMappingURL=run.js.map