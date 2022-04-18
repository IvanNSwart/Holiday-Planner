import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IItineraryItem } from "src/app/models/itineraryItem";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";

@Component({
	selector: "app-view-event",
	templateUrl: "./view-event.component.html",
	styleUrls: ["./view-event.component.scss"],
})
export class ViewEventComponent implements OnInit {
	sub: any;
	id?: string;
	Event?: Observable<IItineraryItem | undefined>;
	constructor(
		private route: ActivatedRoute,
		private fireService: FirebaseServiceService
	) {}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];

			this.Event = this.fireService.getEvent(this.id!);
		});
	}
	deleteEvent() {
		this.fireService.deleteEvent(this.id!);
	}
}
