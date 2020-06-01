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

import { environment } from '../environments/environment';

import { AngularFireModule} from 'angularfire2';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { FirebaseService } from './service/firebase.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule,
  AngularFireModule.initializeApp(environment.firebase),
   AngularFireStorageModule
],
  providers: [
    StatusBar,
    SplashScreen,
    ModelService,
    FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
