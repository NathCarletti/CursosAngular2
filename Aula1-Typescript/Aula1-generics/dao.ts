import { DaoInterface } from './dao.interfaces';
import { Animal } from '../Aula1-classes/Animal';

export class Dao<T> implements DaoInterface<T>{
    tableName: string = '';

    insert(object: T): boolean{
        console.log('inserting...');
        return true;
    }

    update(object: T):boolean{
        return true;
    }

    delete(object: number):T{
        return null;
    }

    find(id:number): T{
        return null;
    }

    findAll():Array<T>{
        return [null];
    }
}