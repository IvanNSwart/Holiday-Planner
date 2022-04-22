import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "src/environments/environment";
import { StoreModule } from "@ngrx/store";
import { authFeatureKey, reducer } from "src/app/store/reducer/planner.reducer";
import { NgZorroModule } from "src/app/modules/ng-zorro/ng-zorro.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		FormsModule,
		StoreModule.forFeature(authFeatureKey, reducer),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		NgZorroModule,
	],
})
export class MainModule {}
