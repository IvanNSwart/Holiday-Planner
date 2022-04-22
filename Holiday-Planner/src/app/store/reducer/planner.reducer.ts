import { Action, createReducer, on } from "@ngrx/store";
import { IItineraryItem } from "src/app/models/itineraryItem";
import { ITrip } from "src/app/models/trip";
import { IUser } from "src/app/models/user";
import * as plannerActions from "../actions/planner.actions";

export const authFeatureKey = "holiday";

export interface userState {
	isLoading: Boolean;
	user: IUser | null;
	trips: ITrip[];
	events: IItineraryItem[];
	selectedTrip: ITrip | null;
	selectedEvent: IItineraryItem | null;
}

export const initialState: userState = {
	isLoading: false,
	user: null,
	trips: [],
	events: [],
	selectedTrip: null,
	selectedEvent: null,
};

export const reducer = createReducer<userState, Action>(
	initialState,
	on(plannerActions.setLoginSuccess, (state, { user }) => ({
		...state,
		user: user,
	})),
	on(plannerActions.getTrips, (state) => ({ ...state, isLoading: true })),
	on(plannerActions.getTripsSuccess, (state, { trips }) => ({
		...state,
		isLoading: false,
		trips,
	})),
	on(plannerActions.getEvents, (state) => ({ ...state, isLoading: true })),
	on(plannerActions.getEventsSuccess, (state, { events }) => ({
		...state,
		isLoading: false,
		events,
	})),
	on(plannerActions.setTrip, (state, { trip }) => ({
		...state,
		selectedOpsMember: trip,
	})),
	on(plannerActions.setEvent, (state, { event }) => ({
		...state,
		selectedOpsMember: event,
	}))
);
