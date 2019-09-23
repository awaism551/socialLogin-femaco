import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from '../../auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, Platform } from '@ionic/angular';

import * as firebase from 'firebase';

// import * as firebase from 'firebase/app';
// import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';

// import {Observable} from 'rxjs/Observable';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user: Observable<firebase.User>;
    private token = '';

  constructor(
    private router : Router,
    private authService:AuthService,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus
  ) { 
      this.user = this.afAuth.authState;
  }

  googleLogin() {
      if (this.platform.is('cordova')) {
          this.nativeGoogleLogin().then((res) => {
              console.log(res);
              this.token = res.credential['idToken'];
          }).catch((err) => {
              console.log(err);
          });
      } else {
          this.webGoogleLogin();
      }
  }
  
  async nativeGoogleLogin() {
      try {
          const gplusUser = await this.gplus.login({
              'webClientId': '82886314276-unp11geigu6c6k08tfauroc5rcgsae0a.apps.googleusercontent.com',
              'offline': 'true',
              'scopes': 'profile email'  
          })

          return await this.afAuth.auth.signInWithCredential(
              firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
          )

      } catch (error) {
          console.error(error);
      }
  }

  async webGoogleLogin(): Promise<void> {
      try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const credential = await this.afAuth.auth.signInWithPopup(provider);
      } catch (error) {
          console.error(error);
      }
  }

  signOut() {
      this.afAuth.auth.signOut();
      if (this.platform.is('cordova')) {
          this.gplus.logout();
      }
      this.token = '';
    // this.router.navigate(["/login"]);
  }

  ngOnInit() {
  }

  goToLoginByUser() {
    this.router.navigate(['/loginbyuser']);
  }


  loginFacebook()
  {

  }

  iniciar(){
     this.router.navigate(['/home']);
  }

//   logOut(){

//      if (localStorage.getItem('metodo') == 'redes')
//        {
//          console.log("EL metodo de acceso fue por redes");
//          this.authService.logOut();
//        }
//        else{
//          console.log("El metodo de acceso no fue por redes");
//          this.authService.logOut();
//        }
//      //this.authService.logOut();

//   }

//   async doGoogleLogin(){
//     const loading = await this.loadingController.create({
//       message: 'Aguarde porfavor...'
//     });
//     this.presentLoading(loading);
//     this.googlePlus.login({})
//       .then(user => {
//         //------------Prueba domingo
//         localStorage.setItem('nombreCliente',user.displayName);
//         localStorage.setItem('email',user.email);
//         localStorage.setItem('metodo','redes');

//         //save user data on the native storage
//         this.nativeStorage.setItem('google_user', {
//           name: user.displayName,
//           email: user.email,
//           metodo : 'redes',
//           picture: user.imageUrl
//         })
//         .then(() => {
//            this.router.navigate(['/home']);
//         }, (error) => {
//           console.log(error);
//         })
//         loading.dismiss();
//       }, err => {
//         console.log(err);
//         if(!this.platform.is('cordova')){
//           this.presentAlert();
//         }
//         loading.dismiss();
//       })
//   }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }

}//End Class
