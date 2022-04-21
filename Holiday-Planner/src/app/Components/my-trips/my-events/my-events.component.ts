import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IItineraryItem } from "src/app/models/itineraryItem";
import { IUser } from "src/app/models/user";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { userState } from "src/app/store/reducer/auth.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";

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
	user?: IUser;
	constructor(
		private fireService: FirebaseServiceService,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private authService: AuthServiceService,
		private userStore: Store<userState>
	) {}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.newEventForm = this.fb.group({
				name: new FormControl("", Validators.required),
				tag: new FormControl("", Validators.required),
				endTime: new FormControl("", Validators.required),
				startTime: new FormControl("", Validators.required),
				cost: new FormControl("", Validators.required),
			});
			this.userStore
				.pipe(select(UserSelectors.getAuthUser))
				.subscribe((res) => (this.user = res));
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
		const { name, tag, endTime, startTime, cost } =
			this.newEventForm?.value;

		this.fireService.createItineraryItem(
			name,
			tag,
			this.id!,
			endTime,
			startTime,
			cost
		);
		this.Events = this.fireService.getEvents(this.id!);
		this.newEventForm?.reset;
		this.New = !this.New;
	}
	logout() {
		return this.authService.signOut();
	}
}
