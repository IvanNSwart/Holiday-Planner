import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/user";

export const loadLoginsSuccess = createAction(
	"[Login] Load Logins Success",
	props<{ user: IUser }>()
);
