import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ITrips } from "src/app/models/trips";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";

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
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.newTripForm = this.fb.group({
			TripName: new FormControl("", Validators.required),
			TripDesc: new FormControl("", Validators.required),
		});
		this.Trips = this.firebaseService.getTrips();
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
