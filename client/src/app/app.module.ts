import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import ru from '@angular/common/locales/ru';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';
import { RegisterComponent } from './features/register/register.component';
import { LangSelectorComponent } from './features/lang-selector/lang-selector.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserComponent } from './layout/user/user.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationLoader, HttpLoaderFactory } from './core/misc/translationLoader';

registerLocaleData(ru);

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
  exports: [
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
