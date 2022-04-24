import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ITrip } from "src/app/models/trip";
import { IUser } from "src/app/models/user";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { userState } from "src/app/store/reducer/planner.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";

@Component({
	selector: "app-view-trip",
	templateUrl: "./view-trip.component.html",
	styleUrls: ["./view-trip.component.scss"],
})
export class ViewTripComponent implements OnInit {
	id?: string;
	sub: any;
	trip?: Observable<ITrip | undefined>;
	user?: IUser;
	update?: boolean;
	updateTripForm?: FormGroup;
	showMenu = false;

	constructor(
		private route: ActivatedRoute,
		private fireService: FirebaseServiceService,
		private authService: AuthServiceService,
		private userStore: Store<userState>,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.updateTripForm = this.fb.group({
			tripName: new FormControl(),
			tripDesc: new FormControl(),
			tripStart: new FormControl(),
			tripEnd: new FormControl(),
		});
		this.sub = this.route.params.subscribe((params) => {
			this.id = params["id"];
			this.trip = this.fireService.getTrip(this.id!);
			this.userStore
				.pipe(select(UserSelectors.getAuthUser))
				.subscribe((res) => (this.user = res));
		});
	}
	deleteTrip() {
		this.fireService.deleteTrip(this.id!);
	}
	updateTrip() {
		const { tripName, tripDesc, tripStart, tripEnd } =
			this.updateTripForm?.value;
		this.fireService.updateTrip(
			this.id!,
			tripName,
			tripDesc,
			tripStart,
			tripEnd
		);
		this.update = !this.update;
	}
	updateToggle() {
		this.update = !this.update;
	}
	logout() {
		return this.authService.signOut();
	}
	toggleNav() {
		this.showMenu = !this.showMenu;
	}
}
