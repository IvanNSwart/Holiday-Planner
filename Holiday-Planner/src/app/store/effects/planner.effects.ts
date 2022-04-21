import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, concatMap, map, of } from "rxjs";
import { IUser } from "src/app/models/user";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { FirebaseServiceService } from "src/app/services/firebase-service.service";
import * as plannerActions from "../actions/planner.actions";
import { userState } from "../reducer/planner.reducer";
import * as UserSelectors from "src/app/store/selector/auth.selectors";

@Injectable()
export class LoginEffects {
	user?: IUser;

	//get Trips effect
	getTrips$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(plannerActions.getTrips),
			concatMap(() =>
				this.fireService
					.getTrips(this.user?.id!)
					.pipe(
						map((trips) =>
							plannerActions.getTripsSuccess({ trips })
						)
					)
			)
		);
	});

	//get Itinerary items effect
	getEvents$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(plannerActions.getTrips),
			concatMap(() =>
				this.fireService.getEvents(this.user?.id!).pipe(
					map((events) =>
						plannerActions.getEventsSuccess({ events })
					),
					catchError((error) => {
						console.log(error);
						return of(
							plannerActions.getEventsSuccess({ events: [] })
						);
					})
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private fireService: FirebaseServiceService,
		private router: Router,
		private userStore: Store<userState>
	) {
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => (this.user = res));
	}
}
