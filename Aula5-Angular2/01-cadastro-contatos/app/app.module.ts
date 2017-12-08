import './util/rxjs-extensions';

import { DialogService } from './contatos/dialog.service';
import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import{BrowserModule} from '@angular/platform-browser';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ContatosModule } from './contatos/contatos.module';


@NgModule({
    imports:[
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations:[AppComponent],
    providers:[
        DialogService
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}