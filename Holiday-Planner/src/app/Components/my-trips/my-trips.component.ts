import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store, StoreModule } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { ITrips } from "src/app/models/trips";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import {
	authFeatureKey,
	reducer,
	userState,
} from "src/app/store/reducer/auth.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";

@Component({
	selector: "app-my-trips",
	templateUrl: "./my-trips.component.html",
	styleUrls: ["./my-trips.component.scss"],
})
export class MyTripsComponent implements OnInit {
	Trips?: Observable<ITrips[]>;
	newTripForm?: FormGroup;
	New?: boolean;
	constructor(
		private firebaseService: FirebaseServiceService,
		private router: Router,
		private fb: FormBuilder,
		private userStore: Store<userState>
	) {}

	ngOnInit(): void {
		this.newTripForm = this.fb.group({
			TripName: new FormControl("", Validators.required),
			TripDesc: new FormControl("", Validators.required),
		});
		this.Trips = this.firebaseService.getTrips();
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => console.log(res));
	}
	identifyTrip(index: number, Trip: ITrips): string {
		return Trip.id;
	}
	createToggle() {
		this.New = !this.New;
	}
	createTrip() {
		const { TripName, TripDesc } = this.newTripForm?.value;

		this.firebaseService.createTrip(TripName, TripDesc);
		this.Trips = this.firebaseService.getTrips();
		this.newTripForm?.reset;
		this.New = !this.New;
	}

	// [routerLink]="['/product-details', product.id]">
}
