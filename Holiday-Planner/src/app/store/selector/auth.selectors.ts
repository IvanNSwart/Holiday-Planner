import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, userState } from "../reducer/auth.reducer";

const authFeatureSelector = createFeatureSelector<userState>(authFeatureKey);

export const getAuthUser = createSelector(
	authFeatureSelector,
	(state: userState) => state.user
);
