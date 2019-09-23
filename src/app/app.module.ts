import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import {AngularFireModule} from 'angularfire2';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// import {AngularFireAuthModule} from 'angularfire2/auth';
import { GlobalService } from '../app/global.service';
import { AngularFireAuth } from 'angularfire2/auth';

//Mis imports
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from '../environments/environment';


// const firebaseConfig = {
//     // apiKey: "AIzaSyCilZyDYUEzZBDBALLWfssrQvX4dRrzHyU"
//     apiKey: "AIzaSyBJYxztbWyGUfXQfnlCNgsNhataS8jOtaU"
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalService,
    GooglePlus,
    NativeStorage
    // ,
    // AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
