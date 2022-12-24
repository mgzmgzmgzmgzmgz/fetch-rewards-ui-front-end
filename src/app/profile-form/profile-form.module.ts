import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileFormRoutingModule } from './profile-form-routing.module';
import { ProfileFormComponent } from './profile-form.component/profile-form.component';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ProfileFormRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [ProfileFormComponent]
})
export class ProfileFormModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCheck, faExclamationCircle);
}
}