import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Components/login/login.component";
import { NotfoundComponent } from "./Components/not-found/notfound.component";
import { RegisterComponent } from "./Components/register/register.component";
import { LogedInGuard } from "./guards/loged-in.guard";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{
		path: "MyTrips",
		loadChildren: () =>
			import("./Components/my-trips/my-trips.module").then(
				(m) => m.ComponentsModule
			),
		canActivate: [LogedInGuard],
	},
	{
		path: "Home",
		loadChildren: () =>
			import("./Components/main/main.module").then((m) => m.MainModule),
		canActivate: [LogedInGuard],
	},
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "**", component: NotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
