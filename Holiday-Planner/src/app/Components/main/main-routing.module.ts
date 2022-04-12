import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { LogedInGuard } from "src/app/guards/loged-in.guard";

const routes: Routes = [
	{
		path: "",
		component: MainComponent,
		canActivate: [LogedInGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
