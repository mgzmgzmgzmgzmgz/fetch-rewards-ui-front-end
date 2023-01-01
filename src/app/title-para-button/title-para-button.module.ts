import { NgModule } from "@angular/core";
import { TitleParaButtonRoutingModule } from "./title-para-button-routing.module";
import { TitleParaButtonComponent } from "./title-para-button.component/title-para-button.component";

@NgModule({
  declarations: [
    TitleParaButtonComponent
  ],
  imports: [
    TitleParaButtonRoutingModule
  ]
})
export class TitleParaButtonModule { }