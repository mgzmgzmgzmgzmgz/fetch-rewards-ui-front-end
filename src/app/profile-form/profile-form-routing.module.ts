import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ProfileFormComponent } from './profile-form.component/profile-form.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileFormRoutingModule { }
