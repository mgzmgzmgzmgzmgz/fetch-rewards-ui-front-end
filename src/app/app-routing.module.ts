import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile-form',
    loadChildren: () => import('./profile-form/profile-form.module').then(m => m.ProfileFormModule),
    data: { animation: 'profile-form' }
  },
  {
    path: 'form-submitted',
    loadChildren: () => import('./form-submitted/form-submitted.module').then(m => m.FormSubmittedModule),
    data: { animation: 'form-submitted' }
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./welcome-page/welcome-page.module').then(m => m.WelcomePageModule),
    data: { animation: 'welcome-page' }
  },
  {
    path: '**',
    loadChildren: () => import('./bad-route-page/bad-route-page.module').then(m => m.BadRoutePageModule),
    data: { animation: 'bad-route-page' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
