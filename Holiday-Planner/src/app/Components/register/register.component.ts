import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import * as firebase from "firebase/compat";
import { Router, RouterLink } from "@angular/router";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	registerForm?: FormGroup;
	constructor(
		private fb: FormBuilder,
		private auth: AngularFireAuth,
		private router: Router
	) {}

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			email: new FormControl("", Validators.required),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}
	createUser() {
		const { email, password } = this.registerForm?.value;
		this.auth
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				alert("SUCCESS");
				this.router.navigate(["/"]);
			})
			.catch((error) => {
				alert("invalid register in details");
			});
	}
}
