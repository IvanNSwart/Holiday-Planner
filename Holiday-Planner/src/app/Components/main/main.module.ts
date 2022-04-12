import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "../../store/effects/login.effects";

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		EffectsModule.forFeature([LoginEffects]),
	],
})
export class MainModule {}
