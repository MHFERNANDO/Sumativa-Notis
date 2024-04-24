import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase} from '@angular/fire/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()), IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"termometro-d3093","appId":"1:782095105958:web:c1c8a1acaa9284fad75967","databaseURL":"https://termometro-d3093-default-rtdb.firebaseio.com","storageBucket":"termometro-d3093.appspot.com","apiKey":"AIzaSyD_MkXPV8uwMLv2BDiIie5tRfZG7MzSqf8","authDomain":"termometro-d3093.firebaseapp.com","messagingSenderId":"782095105958","measurementId":"G-L1WLG09Q38"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
