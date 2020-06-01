import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModelService } from './service/model.service';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';         // can be skipped since imported in component.ts file
//import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angularfire2/storage';
//import { AngularFireAuthModule } from '@angular/fire/auth';  // can be skipped since imported in component.ts file


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule, AngularFireModule.initializeApp({
     apiKey: "AIzaSyDP7SvMfEHh_F1xzr88EHwHbfoxb5Ir2pQ",
     authDomain: "shubhendra-tomar.firebaseapp.com",
     storageBucket: "shubhendra-tomar.appspot.com",
     projectId: "shubhendra-tomar",
     databaseURL: "https://shubhendra-tomar.firebaseio.com",
     messagingSenderId: "545952674743",
     appId: "1:545952674743:web:a1b1c145b302d84c26ae32",
     measurementId: "G-1BFL56DJSF",
   }),
   AngularFireStorageModule
],
  providers: [
    StatusBar,
    SplashScreen,
    ModelService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
