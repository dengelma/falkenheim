import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {ContentModule} from './content/content.module';
import {ContactComponent} from './contact/contact.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    AngularFireModule.initializeApp(
      environment.firebase,
      'angular-auth-firebase'
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
