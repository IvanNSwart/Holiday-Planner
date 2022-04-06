import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
	EmailValidator,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm?: FormGroup;
	constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: new FormControl("", Validators.required),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}
	login() {
		const { email, password } = this.loginForm?.value;
		this.auth.signInWithEmailAndPassword(email, password).then((user) => {
			console.log(user + " is logged in");
		});
	}
}
