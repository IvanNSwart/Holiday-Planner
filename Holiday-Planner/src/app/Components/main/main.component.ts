import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IUser } from "src/app/models/user";
import { userState } from "src/app/store/reducer/auth.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { NzCalendarMode, NzCalendarModule } from "ng-zorro-antd/calendar";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
	user?: IUser;
	date = new Date(2012, 11, 21);
	mode: NzCalendarMode = "month";

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
