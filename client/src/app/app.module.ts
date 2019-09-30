import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import ru from '@angular/common/locales/ru';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';
import { RegisterComponent } from './features/register/register.component';
import { LangSelectorComponent } from './features/lang-selector/lang-selector.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserComponent } from './layout/user/user.component';


registerLocaleData(ru);

export class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    return this.http.get("/api/translation/" + lang);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LangSelectorComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
