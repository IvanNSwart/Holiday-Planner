import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTripsComponent } from "./my-trips.component";
import { MyTripsRoutingModule } from "./my-trips-routing.module";

@NgModule({
	declarations: [MyTripsComponent],
	imports: [CommonModule, MyTripsRoutingModule],
})
export class ComponentsModule {}
