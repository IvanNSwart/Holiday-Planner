import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({
	providedIn: "root",
})
export class LogedInGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthServiceService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.authService.checkAuth().pipe(
			map((user) => {
				if (user !== null) {
					return true;
				} else {
					return false;
				}
			}),
			tap((res) => {
				if (res) {
					return route;
				} else {
					return this.router.navigate(["/"]);
				}
			})
		);
	}
}
