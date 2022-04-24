import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { map, Observable } from "rxjs";
import { IItineraryItem } from "../models/itineraryItem";
import { ITrip } from "../models/trip";
import { IUser } from "../models/user";
import * as UserSelectors from "src/app/store/selector/auth.selectors";
import { select, Store } from "@ngrx/store";
import { userState } from "../store/reducer/planner.reducer";
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Injectable({
	providedIn: "root",
})
export class FirebaseServiceService {
	user?: IUser;

	constructor(
		private db: AngularFirestore,
		private userStore: Store<userState>
	) {
		this.userStore
			.pipe(select(UserSelectors.getAuthUser))
			.subscribe((res) => (this.user = res));
	}
	getAuth() {
		return this.userStore.pipe(select(UserSelectors.getAuthUser));
	}
	getUser() {
		return this.db
			.collection("Users")
			.doc(`${this.user?.id}`)
			.valueChanges();
	}
	getTrips(): Observable<ITrip[]> {
		return this.db
			.collection<ITrip>("Trips", (ref) =>
				ref.where("userId", "==", `${this.user?.id}`)
			)
			.snapshotChanges()
			.pipe(
				map((change) =>
					change.map((a) => {
						const data = a.payload.doc.data();
						let { id } = data;
						id = a.payload.doc.id;
						return { ...data, id } as ITrip;
					})
				)
			);
	}
	getTrip(id: string) {
		return this.db.collection<ITrip>("Trips").doc(`${id}`).valueChanges();
	}
	getEvents(tripId: string): Observable<IItineraryItem[]> {
		return this.db
			.collection<IItineraryItem>("Itinerary_Items", (ref) =>
				ref.where("tripId", "==", `${tripId}`)
			)
			.snapshotChanges()
			.pipe(
				map((change) =>
					change.map((a) => {
						const data = a.payload.doc.data();
						let { id } = data;
						id = a.payload.doc.id;
						return {
							...data,
							id,
						} as IItineraryItem;
					})
				)
			);
	}

	getCalanderEvents(): Observable<IItineraryItem[]> {
		return this.db
			.collection<IItineraryItem>("Itinerary_Items", (ref) =>
				ref.where("userId", "==", `${this.user?.id}`)
			)
			.snapshotChanges()
			.pipe(
				map((change) =>
					change.map((a) => {
						const data = a.payload.doc.data();
						let { id } = data;
						id = a.payload.doc.id;
						return {
							...data,
							id,
						} as IItineraryItem;
					})
				)
			);
	}

	getEvent(tripId: string) {
		return this.db
			.collection<IItineraryItem>("Itinerary_Items")
			.doc(`${tripId}`)
			.valueChanges();
	}
	createTrip(name: string, desc: string, startDate: Date, endDate: Date) {
		return this.db
			.collection("Trips")
			.add({
				name: `${name}`,
				desc: `${desc}`,
				userId: this.user?.id,
				endDate: endDate,
				startDate: startDate,
			})
			.then((docRef) => {
				alert("Success");
			})
			.catch((error) => {
				alert("error");
			});
	}
	createItineraryItem(
		name: string,
		tag: string,
		tripId: string,
		endTime: Date,
		startTime: Date,
		cost: number
	) {
		return this.db
			.collection("Itinerary_Items")
			.add({
				name: name,
				tag: tag,
				tripId: tripId,
				endTime: endTime,
				startTime: startTime,
				cost: cost,
				userId: this.user?.id,
			})
			.then((docRef) => {
				alert("Success");
			})
			.catch((error) => {
				alert("error");
			});
	}
	updateItineraryItem(
		eventId: string,
		name: string,
		tag: string,
		endTime: Date,
		startTime: Date,
		cost: number
	) {
		return this.db
			.collection("Itinerary_Items")
			.doc(`${eventId}`)
			.update({
				name: name,
				tag: tag,
				endTime: endTime,
				startTime: startTime,
				cost: cost,
			})
			.then((docRef) => {
				alert("Success");
			})
			.catch((error) => {
				alert("error");
			});
	}
	updateTrip(
		tripId: string,
		name: string,
		desc: string,
		startDate: Date,
		endDate: Date
	) {
		return this.db
			.collection("Trips")
			.doc(`${tripId}`)
			.update({
				name: `${name}`,
				desc: `${desc}`,
				userId: this.user?.id,
				endDate: endDate,
				startDate: startDate,
			});
	}
	deleteTrip(tripId: string) {
		return this.db
			.collection("Trips")
			.doc(`${tripId}`)
			.delete()
			.then(() => {
				alert("SUCCESS");
			})
			.catch((error) => {
				alert("error");
			});
	}
	deleteEvent(eventId: string) {
		return this.db
			.collection("Itineray_Items")
			.doc(`${eventId}`)
			.delete()
			.then(() => {
				alert("SUCCESS");
			})
			.catch((error) => {
				alert("error");
			});
	}
}
