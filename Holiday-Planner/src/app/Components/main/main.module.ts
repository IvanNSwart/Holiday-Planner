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

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		EffectsModule.forFeature([LoginEffects]),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
	],
})
export class MainModule {}
