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
    loadChildren: () => import('./title-para-button/title-para-button.module').then(m => m.TitleParaButtonModule),
    data: { animation: 'form-submitted' }
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./title-para-button/title-para-button.module').then(m => m.TitleParaButtonModule),
    data: { animation: 'welcome-page' }
  },
  {
    path: '**',
    loadChildren: () => import('./title-para-button/title-para-button.module').then(m => m.TitleParaButtonModule),
    data: { animation: 'bad-route-page' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
