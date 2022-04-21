import { createAction, props } from "@ngrx/store";
import { IItineraryItem } from "src/app/models/itineraryItem";
import { ITrip } from "src/app/models/trip";
import { IUser } from "src/app/models/user";

export const setLoginSuccess = createAction(
	"[Holiday] setLoginSuccess",
	props<{ user: IUser }>()
);

export const getTrips = createAction("[Holiday] getTrips ");

export const getTripsSuccess = createAction(
	"[Holiday] getTripsSuccess",
	props<{ trips: ITrip[] }>()
);

export const getEvents = createAction("[Holiday] getEvents");

export const getEventsSuccess = createAction(
	"[Holiday] getEventsSuccess",
	props<{ events: IItineraryItem[] }>()
);
export const setTrip = createAction(
	"[Holiday] setTrip",
	props<{ trip: ITrip }>()
);
export const setEvent = createAction(
	"[Holiday] setEvent",
	props<{ event: IItineraryItem }>()
);
