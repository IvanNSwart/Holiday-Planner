import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { FirebaseServiceService } from "../services/firebase-service.service";

@Injectable({
	providedIn: "root",
})
export class LogedInGuard implements CanActivate {
	constructor(
		private router: Router,
		private fireService: FirebaseServiceService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.fireService.getAuth().pipe(
			map((user) => {
				if (user === null) {
					this.router.navigate(["/"]);
					return false;
				} else {
					return true;
				}
			})
		);
	}
}
