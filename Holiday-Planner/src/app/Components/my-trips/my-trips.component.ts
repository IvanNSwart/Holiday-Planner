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
import { ITrip } from "src/app/models/trip";
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
	Trips?: Observable<ITrip[]>;
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
			tripName: new FormControl("", Validators.required),
			tripDesc: new FormControl("", Validators.required),
			tripStart: new FormControl("", Validators.required),
			tripEnd: new FormControl("", Validators.required),
		});
		this.Trips = this.firebaseService.getTrips();
		this.Trips.subscribe((res) => console.log(res));
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => (this.user = res));
	}
	identifyTrip(index: number, Trip: ITrip): string {
		return Trip.id;
	}
	createToggle() {
		this.New = !this.New;
	}
	createTrip() {
		const { tripName, tripDesc, tripStart, tripEnd } =
			this.newTripForm?.value;

		this.firebaseService.createTrip(tripName, tripDesc, tripStart, tripEnd);
		this.Trips = this.firebaseService.getTrips();
		this.newTripForm?.reset;
		this.New = !this.New;
	}
	logout() {
		return this.authService.signOut();
	}
	// [routerLink]="['/product-details', product.id]">
}
