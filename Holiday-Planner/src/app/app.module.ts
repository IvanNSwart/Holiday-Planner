import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { RegisterComponent } from "./Components/register/register.component";
import { NotfoundComponent } from "./Components/not-found/notfound.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzFormModule } from "ng-zorro-antd/form";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { authFeatureKey, reducer } from "./store/reducer/auth.reducer";

registerLocaleData(en);

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		NotfoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NzFormModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		provideFirestore(() => getFirestore()),
		StoreModule.forRoot({}, {}),
		EffectsModule.forRoot([]),
		StoreModule.forFeature(authFeatureKey, reducer),
	],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	bootstrap: [AppComponent],
})
export class AppModule {}
