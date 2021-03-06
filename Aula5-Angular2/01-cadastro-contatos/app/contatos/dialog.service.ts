import { Injectable } from '@angular/core';

@Injectable()
export class DialogService{
    confirm(message?:string){//nativo do javascript
        return new Promise(resolve=>{
            return resolve(window.confirm(message || "confirmar?"));
        });
    }
}