import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
	providedIn: "root",
})
export class AuthServiceService {
	constructor(private auth: AngularFireAuth) {}

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
}
