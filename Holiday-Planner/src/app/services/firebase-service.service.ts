import { ChangeDetectionStrategy, Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { initializeApp } from "firebase/app";
import { Firestore, collection, doc, setDoc } from "firebase/firestore";
import { map, Observable } from "rxjs";
import { IItineraryItem } from "../models/itineraryItem";
import { ITrips } from "../models/trips";
import { IUser } from "../models/user";
@Injectable({
	providedIn: "root",
})
export class FirebaseServiceService {
	constructor(private db: AngularFirestore) {}

	getUser() {
		return this.db
			.collection("Users")
			.doc("tlpBvkp5BqhrNe5PTVvHcJXHKR73")
			.valueChanges();
	}
	getTrips(): Observable<ITrips[]> {
		return this.db
			.collection<ITrips>("Trips", (ref) =>
				ref.where("UserId", "==", "tlpBvkp5BqhrNe5PTVvHcJXHKR73")
			)
			.snapshotChanges()
			.pipe(
				map((change) =>
					change.map((a) => {
						const data = a.payload.doc.data();
						let { id, Name, Desc, UserId } = data;
						id = a.payload.doc.id;
						return { id, Name, Desc, UserId } as ITrips;
					})
				)
			);
	}
	getTrip(ID: string) {
		return this.db.collection<ITrips>("Trips").doc(`${ID}`).valueChanges();
	}
	getEvents(Id: string): Observable<IItineraryItem[]> {
		return this.db
			.collection<IItineraryItem>("Itinerary_Items", (ref) =>
				ref.where("Trip_ID", "==", `${Id}`)
			)
			.snapshotChanges()
			.pipe(
				map((change) =>
					change.map((a) => {
						const data = a.payload.doc.data();
						let {
							id,
							Name,
							Tag,
							Trip_ID,
							End_Time,
							Start_Time,
							Cost,
						} = data;
						id = a.payload.doc.id;
						return {
							id,
							Name,
							Tag,
							Trip_ID,
							End_Time,
							Start_Time,
							Cost,
						} as IItineraryItem;
					})
				)
			);
	}
	getEvent(ID: string) {
		return this.db
			.collection<IItineraryItem>("Itinerary_Items")
			.doc(`${ID}`)
			.valueChanges();
	}
	createTrip(Name: string, Desc: string) {
		return this.db
			.collection("Trips")
			.add({
				Name: `${Name}`,
				Desc: `${Desc}`,
				UserId: "testing",
			})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	}
	createItineraryItem(
		name: string,
		tag: string,
		trip_ID: string,
		end_Time: Date,
		start_Time: Date,
		cost: number
	) {
		return this.db
			.collection("Itinerary_Items")
			.add({
				Name: name,
				Tag: tag,
				Trip_ID: trip_ID,
				End_Time: end_Time,
				Start_Time: start_Time,
				Cost: cost,
			})
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	}
	deleteTrip(ID: string) {
		return this.db
			.collection("Trips")
			.doc(`${ID}`)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	}
	deleteEvent(ID: string) {
		return this.db
			.collection("Itineray_Items")
			.doc(`${ID}`)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	}
}
