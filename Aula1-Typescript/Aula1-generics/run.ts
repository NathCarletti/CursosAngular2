import { DaoInterface } from "../Aula1-interfaces/dao.interfaces";
import { Animal } from '../Aula1-classes/Animal';
import { Dao } from './dao';
import { Cavalo } from '../Aula1-classes/Cavalo';


let dao: Dao<Animal> = new Dao<Animal>();
let animal: Animal = new Animal('Rex');
let cavalo: Cavalo = new Cavalo('Titã');
dao.insert(animal);