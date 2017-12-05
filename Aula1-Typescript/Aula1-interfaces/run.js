"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animal_dao_1 = require("./Animal-dao");
var Animal_1 = require("../Aula1-classes/Animal");
var dao = new Animal_dao_1.AnimalDao();
var animal = new Animal_1.Animal('Rex');
dao.insert(animal);
//# sourceMappingURL=run.js.map