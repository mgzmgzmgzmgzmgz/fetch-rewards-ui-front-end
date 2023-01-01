import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TitleParaButtonComponent } from "./title-para-button.component/title-para-button.component";

const routes: Routes = [
    {
        path: '',
        component: TitleParaButtonComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitleParaButtonRoutingModule { }