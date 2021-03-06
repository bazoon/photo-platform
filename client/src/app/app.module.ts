import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {
  TranslationLoader,
  HttpLoaderFactory
} from './core/misc/translationLoader';
import { PublicationComponent } from './features/publication/publication.component';
import { PublicationsComponent } from './features/publications/publications.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ContestPhotosComponent } from './features/contest-photos/contest-photos.component';
import { SectionPhotosComponent } from './features/section-photos/section-photos.component';
import { VkComponent } from './features/login/vk/vk.component';
import { FbComponent } from './features/login/fb/fb.component';
import { GoogleComponent } from './features/login/google/google.component';
import { AboutComponent } from './features/about/about.component';
import { ThesisComponent } from './features/thesis/thesis.component';
import { RulesComponent } from './features/rules/rules.component';
import { ContactsComponent } from './features/contacts/contacts.component';
import { AuthService } from 'src/app/core/interceptor/auth.service';
import { CurrentUserService } from 'src/app/state/current-user.service';
import { RestoreFormComponent } from './features/restore-form/restore-form.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LangSelectorComponent,
    UserComponent,
    PublicationComponent,
    PublicationsComponent,
    SafeHtmlPipe,
    ContestPhotosComponent,
    SectionPhotosComponent,
    VkComponent,
    FbComponent,
    GoogleComponent,
    AboutComponent,
    ThesisComponent,
    RulesComponent,
    ContactsComponent,
    RestoreFormComponent,
    ChangePasswordComponent
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
    })
  ],
  exports: [SharedModule],
  /* providers: [ */
  /*   { */
  /*     provide: HTTP_INTERCEPTORS, */
  /*     useClass: AuthService, */
  /*     multi: true */
  /*   } */
  /* ], */
  bootstrap: [AppComponent]
})
export class AppModule {}
