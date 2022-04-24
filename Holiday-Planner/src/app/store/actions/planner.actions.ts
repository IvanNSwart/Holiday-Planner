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

export const addEvent = createAction("[Holiday] addEvents");

export const addEventSuccess = createAction(
	"[Holiday] addEventSuccess",
	props<{ events: IItineraryItem[] }>()
);
export const addTrip = createAction("[Holiday] addTrip");

export const addTripSuccess = createAction(
	"[Holiday] addTripSuccess",
	props<{ trip: ITrip }>()
);

export const updateTrip = createAction("[Holiday] updateTrip");

export const updateTripSuccess = createAction(
	"[Holiday] updateTripSuccess",
	props<{ trip: ITrip }>()
);

export const updateEvent = createAction("[Holiday] updateEvent");

export const updateEventSuccess = createAction(
	"[Holiday] updateEventSuccess",
	props<{ events: IItineraryItem[] }>()
);

export const deleteEvent = createAction("[Holiday] deleteEvent");

export const deleteEventSuccess = createAction(
	"[Holiday] deleteEventSuccess",
	props<{ events: IItineraryItem[] }>()
);

export const deleteTrip = createAction("[Holiday] deleteTrip");

export const deleteTripSuccess = createAction(
	"[Holiday] deleteTripSuccess",
	props<{ trip: ITrip }>()
);

export const setTrip = createAction(
	"[Holiday] setTrip",
	props<{ trip: ITrip }>()
);
export const setEvent = createAction(
	"[Holiday] setEvent",
	props<{ event: IItineraryItem }>()
);
