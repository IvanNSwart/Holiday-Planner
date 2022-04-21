import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "../../store/effects/login.effects";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "src/environments/environment";
import { getFirestore } from "firebase/firestore";
import { Firestore, provideFirestore } from "@angular/fire/firestore";
import { StoreModule } from "@ngrx/store";
import { authFeatureKey, reducer } from "src/app/store/reducer/auth.reducer";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgZorroModule } from "src/app/modules/ng-zorro/ng-zorro.module";

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		StoreModule.forFeature(authFeatureKey, reducer),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		NgZorroModule,
	],
})
export class MainModule {}
