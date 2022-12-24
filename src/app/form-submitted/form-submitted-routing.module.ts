import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormSubmittedComponent } from './form-submitted.component/form-submitted.component';

const routes: Routes = [
    {
        path: '',
        component: FormSubmittedComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormSubmittedRoutingModule { }
