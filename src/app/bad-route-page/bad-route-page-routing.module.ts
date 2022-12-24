import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadRoutePageComponent } from './bad-route-page.component/bad-route-page.component';

const routes: Routes = [
    {
        path: '',
        component: BadRoutePageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadRoutePageRoutingModule { }
