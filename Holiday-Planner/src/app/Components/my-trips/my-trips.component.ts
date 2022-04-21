import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ITrips } from "src/app/models/trips";
import { IUser } from "src/app/models/user";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { userState } from "src/app/store/reducer/auth.reducer";
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
	user?: IUser;
	constructor(
		private firebaseService: FirebaseServiceService,
		private router: Router,
		private fb: FormBuilder,
		private userStore: Store<userState>,
		private authService: AuthServiceService
	) {}

	ngOnInit(): void {
		this.newTripForm = this.fb.group({
			TripName: new FormControl("", Validators.required),
			TripDesc: new FormControl("", Validators.required),
			TripStart: new FormControl("", Validators.required),
			TripEnd: new FormControl("", Validators.required),
		});
		this.Trips = this.firebaseService.getTrips();
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => (this.user = res));
	}
	identifyTrip(index: number, Trip: ITrips): string {
		return Trip.id;
	}
	createToggle() {
		this.New = !this.New;
	}
	createTrip() {
		const { TripName, TripDesc, TripStart, TripEnd } =
			this.newTripForm?.value;

		this.firebaseService.createTrip(TripName, TripDesc, TripStart, TripEnd);
		this.Trips = this.firebaseService.getTrips();
		this.newTripForm?.reset;
		this.New = !this.New;
	}
	logout() {
		return this.authService.signOut();
	}
	// [routerLink]="['/product-details', product.id]">
}
