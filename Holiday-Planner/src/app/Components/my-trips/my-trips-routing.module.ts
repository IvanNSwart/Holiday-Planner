import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTripsComponent } from "./my-trips.component";
import { RouterModule, Routes } from "@angular/router";
import { ViewTripComponent } from "./view-trip/view-trip.component";
import { ViewEventComponent } from "./view-event/view-event.component";
import { LogedInGuard } from "src/app/guards/loged-in.guard";

const routes: Routes = [
	{
		path: "",
		component: MyTripsComponent,
	},
	{
		path: ":id",
		component: ViewTripComponent,
	},

	{
		path: ":id/event/:id",
		component: ViewEventComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MyTripsRoutingModule {}
