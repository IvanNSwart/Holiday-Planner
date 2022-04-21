import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, userState } from "../reducer/planner.reducer";

const authFeatureSelector = createFeatureSelector<userState>(authFeatureKey);

export const getAuthUser = createSelector(
	authFeatureSelector,
	(state: userState) => state.user!
);
export const selectTrips = createSelector(
	authFeatureSelector,
	(state: userState) => state.trips
);
export const selectEvents = createSelector(
	authFeatureSelector,
	(state: userState) => state.events
);
