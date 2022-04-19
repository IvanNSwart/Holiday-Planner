import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect } from "@ngrx/effects";
import { AuthServiceService } from "src/app/services/auth-service.service";

@Injectable()
export class LoginEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthServiceService,
		private router: Router
	) {}
}
