import { Action, createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/models/user";

import { loadLoginsSuccess } from "../actions/login.actions";

export const authFeatureKey = "Login";

export interface userState {
	user: IUser | null;
}

export const initialState: userState = {
	user: null,
};

export const reducer = createReducer<userState, Action>(
	initialState,
	on(loadLoginsSuccess, (state, action) => ({
		...state,
		user: action.user,
	}))
);
