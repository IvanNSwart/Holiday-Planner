import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTripsComponent } from "./my-trips.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: MyTripsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MyTripsRoutingModule {}
