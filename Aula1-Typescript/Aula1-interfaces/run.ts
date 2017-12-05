import { DaoInterface } from "./dao.interfaces";
import { AnimalDao } from './Animal-dao';
import { Animal } from '../Aula1-classes/Animal';


let dao: DaoInterface = new AnimalDao();
let animal:Animal = new Animal('Rex');

dao.insert(animal);