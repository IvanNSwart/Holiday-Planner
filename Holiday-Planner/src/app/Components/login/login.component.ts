import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { userState } from "src/app/store/reducer/auth.reducer";
import * as UserActions from "src/app/store/actions/login.actions";
import * as UserSelectors from "src/app/store/selector/auth.selectors";
import { IUser } from "src/app/models/user";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm?: FormGroup;
	loginUser: IUser = {
		id: "",
		email: "",
	};
	constructor(
		private fb: FormBuilder,
		private auth: AngularFireAuth,
		private userStore: Store<userState>
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: new FormControl("", [Validators.email, Validators.required]),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}

	login() {
		const { email, password } = this.loginForm?.value;
		if (this.loginForm?.invalid) {
			return;
		}
		this.auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.log(user.user?.email + " is logged in");
				this.userStore.dispatch(
					UserActions.loadLoginsSuccess({
						user: {
							id: user.user!.uid,
							email: user.user!.email,
						},
					})
				);
			})
			.catch((error) => {
				alert("invalid log in details");
			});

		console.log(this.userStore.pipe(select(UserSelectors.getAuthUser)));
	}
}
