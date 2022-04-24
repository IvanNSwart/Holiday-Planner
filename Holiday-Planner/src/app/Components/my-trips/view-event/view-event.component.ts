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
import { userState } from "src/app/store/reducer/planner.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";

@Component({
	selector: "app-view-event",
	templateUrl: "./view-event.component.html",
	styleUrls: ["./view-event.component.scss"],
})
export class ViewEventComponent implements OnInit {
	sub: any;
	id?: string;
	Event?: Observable<IItineraryItem | undefined>;
	user?: IUser;
	updateEventForm?: FormGroup;
	update?: boolean;
	showMenu = false;

	constructor(
		private route: ActivatedRoute,
		private fireService: FirebaseServiceService,
		private authService: AuthServiceService,
		private userStore: Store<userState>,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.updateEventForm = this.fb.group({
			name: new FormControl("", Validators.required),
			tag: new FormControl("", Validators.required),
			endTime: new FormControl("", Validators.required),
			startTime: new FormControl("", Validators.required),
			cost: new FormControl("", Validators.required),
		});
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];

			this.Event = this.fireService.getEvent(this.id!);
			this.userStore
				.pipe(select(UserSelectors.getAuthUser))
				.subscribe((res) => (this.user = res));
		});
	}
	deleteEvent() {
		this.fireService.deleteEvent(this.id!);
	}
	logout() {
		return this.authService.signOut();
	}
	updateToggle() {
		this.update = !this.update;
	}
	updateEvent() {
		const { name, tag, endTime, startTime, cost } =
			this.updateEventForm?.value;

		this.fireService.updateItineraryItem(
			this.id!,
			name,
			tag,
			endTime,
			startTime,
			cost
		);

		this.update = !this.update;
	}
	toggleNav() {
		this.showMenu = !this.showMenu;
	}
}
