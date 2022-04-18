import { Component, OnInit } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";
import { select, Store } from "@ngrx/store";
import { collection, Firestore } from "firebase/firestore";
import { Observable } from "rxjs";
import { IUser } from "src/app/models/user";
import { userState } from "src/app/store/reducer/auth.reducer";
import * as UserActions from "src/app/store/actions/login.actions";
import * as UserSelectors from "src/app/store/selector/auth.selectors";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import { ITrips } from "src/app/models/trips";
import { Router } from "@angular/router";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
	user?: Observable<any>;

	constructor(
		private userStore: Store<userState>,
		private firebaseService: FirebaseServiceService,
		private router: Router
	) {}

	// user$?: Observable<any>;
	ngOnInit(): void {
		this.user = this.firebaseService.getUser();
	}
	getMyTrips() {
		this.router.navigate(["MyTrips"]);
	}
}
