import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router/src/router';


const appRoutes:Routes=[
{
    path:'',
    redirectTo:'/contato',
    pathMatch:'full'
    }
]


@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}