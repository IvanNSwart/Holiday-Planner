import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { IItineraryItem } from "src/app/models/itineraryItem";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";

@Component({
	selector: "app-my-events",
	templateUrl: "./my-events.component.html",
	styleUrls: ["./my-events.component.scss"],
})
export class MyEventsComponent implements OnInit {
	Events?: Observable<IItineraryItem[]>;
	newEventForm?: FormGroup;
	sub: any;
	id?: string;
	New?: boolean;
	constructor(
		private fireService: FirebaseServiceService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.newEventForm = this.fb.group({
				name: new FormControl("", Validators.required),
				tag: new FormControl("", Validators.required),
				end_Time: new FormControl("", Validators.required),
				start_Time: new FormControl("", Validators.required),
				cost: new FormControl("", Validators.required),
			});
		});

		this.Events = this.fireService.getEvents(this.id!);
	}
	identifyEvent(index: number, Event: IItineraryItem): string {
		return Event.id;
	}
	createToggle() {
		this.New = !this.New;
	}
	createEvent() {
		const { name, tag, end_Time, start_Time, cost } =
			this.newEventForm?.value;

		this.fireService.createItineraryItem(
			name,
			tag,
			this.id!,
			end_Time,
			start_Time,
			cost
		);
		this.Events = this.fireService.getEvents(this.id!);
		this.newEventForm?.reset;
		this.New = !this.New;
	}
}
