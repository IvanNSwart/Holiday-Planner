import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Components/login/login.component";
import { NotfoundComponent } from "./Components/notfound/notfound.component";
import { RegisterComponent } from "./Components/register/register.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "**", component: NotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
