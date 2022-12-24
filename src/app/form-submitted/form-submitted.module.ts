import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormSubmittedRoutingModule } from "./form-submitted-routing.module";
import { FormSubmittedComponent } from "./form-submitted.component/form-submitted.component";

@NgModule({
  declarations: [
    FormSubmittedComponent
  ],
  imports: [
    CommonModule,
    FormSubmittedRoutingModule
  ]
})
export class FormSubmittedModule { }