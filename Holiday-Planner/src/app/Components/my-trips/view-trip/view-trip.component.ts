import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ITrips } from "src/app/models/trips";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";

@Component({
	selector: "app-view-trip",
	templateUrl: "./view-trip.component.html",
	styleUrls: ["./view-trip.component.scss"],
})
export class ViewTripComponent implements OnInit {
	id?: string;
	sub: any;
	trip?: Observable<ITrips | undefined>;
	constructor(
		private route: ActivatedRoute,
		private fireService: FirebaseServiceService
	) {}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.trip = this.fireService.getTrip(this.id!);
		});
	}
	deleteTrip() {
		this.fireService.deleteTrip(this.id!);
	}
}
