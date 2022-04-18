import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/compat";

@Injectable({
	providedIn: "root",
})
export class AuthServiceService {
	constructor(private auth: AngularFireAuth, private router: Router) {}

	checkAuth() {
		return this.auth.authState;
	}
	login(email: string, password: string) {
		this.auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.log(user + " is logged in");
			})
			.catch((error) => {
				alert("invalid log in details");
			});
	}
	signOut() {
		this.auth
			.signOut()
			.then(() => {
				this.router.navigate(["/"]);
			})
			.catch((error) => {
				// An error happened.
			});
	}
}
