import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IUser } from "src/app/models/user";
import { userState } from "src/app/store/reducer/planner.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { NzCalendarMode } from "ng-zorro-antd/calendar";
import { Observable } from "rxjs";
import { ITrip } from "src/app/models/trip";
import { IItineraryItem } from "src/app/models/itineraryItem";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
	user?: IUser;
	date = new Date(2012, 11, 21);
	mode: NzCalendarMode = "month";
	events$?: Observable<IItineraryItem[]>;
	showMenu = false;

	constructor(
		private userStore: Store<userState>,
		private firebaseService: FirebaseServiceService,
		private router: Router,
		private authService: AuthServiceService
	) {}

	// user$?: Observable<any>;
	ngOnInit(): void {
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => (this.user = res));
		this.events$ = this.firebaseService.getCalanderEvents();
	}

	toggleNav() {
		this.showMenu = !this.showMenu;
	}

	viewEvent(tripId: string, eventId: string) {
		this.router.navigate(["MyTrips", tripId, "event", eventId], {
			replaceUrl: true,
		});
	}

	getMyTrips() {
		this.router.navigate(["MyTrips"]);
	}
	logout() {
		return this.authService.signOut();
	}
	panelChange(change: { date: Date; mode: string }): void {
		console.log(change.date, change.mode);
	}
}
