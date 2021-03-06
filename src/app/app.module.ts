import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContentModule } from './content/content.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ContactComponent, NotificationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    AngularFireModule.initializeApp(environment.firebase, 'falkenheim-handball'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
