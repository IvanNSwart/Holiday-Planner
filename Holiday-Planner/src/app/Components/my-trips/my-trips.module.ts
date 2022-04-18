import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTripsComponent } from "./my-trips.component";
import { MyTripsRoutingModule } from "./my-trips-routing.module";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "src/app/store/effects/login.effects";
import { environment } from "src/environments/environment";
import { ViewTripComponent } from "./view-trip/view-trip.component";
import { MyEventsComponent } from "./my-events/my-events.component";
import { ViewEventComponent } from "./view-event/view-event.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { authFeatureKey, reducer } from "src/app/store/reducer/auth.reducer";
import { StoreModule } from "@ngrx/store";

@NgModule({
	declarations: [
		MyTripsComponent,
		ViewTripComponent,
		MyEventsComponent,
		ViewEventComponent,
	],
	imports: [
		CommonModule,
		MyTripsRoutingModule,
		StoreModule.forFeature(authFeatureKey, reducer),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class ComponentsModule {}
