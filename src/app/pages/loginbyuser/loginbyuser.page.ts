import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-loginbyuser',
  templateUrl: './loginbyuser.page.html',
  styleUrls: ['./loginbyuser.page.scss'],
})
export class LoginbyuserPage implements OnInit {

 user : string;
 pass : string;
 datosLogin = {};
 recordarSesion : any = 0;


  constructor(
    private router : Router,
    private authService:AuthService,
    public http: HttpClient,
    public toastController: ToastController,
    private nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
          //recupero los datos del storage
          this.authService.token = localStorage.getItem('recordarToken');
          console.log("Se ejecuto ngOnInit");
          console.log(localStorage.getItem('recordarSesion'));
  }

  login() {
    this.router.navigate(['/slides']);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  toSlider() {
     this.router.navigate(['/slides']); 
  }
  
  logOut(){
     localStorage.clear();
     this.authService.logOut();
  }

  loginbyUser(){


       this.authService.getLogin(this.user, this.pass)
                        .subscribe(
                          (data) => { // Success
                                
                                this.datosLogin = data; 
                                console.log("Datos Login");
                                console.log(data);

                                if (data != false){
                                  console.log("Se logueo");
                                   // leo si recuerda la sesion, para el primer logueo
                                 if (this.recordarSesion == true){
                                   
                                    console.log("Recuerda la sesion");
                                    console.log(this.datosLogin[0].codigoCliente);
                                    console.log(this.datosLogin[0].denominacion);
                                    console.log(this.datosLogin[0].pass);
                                    console.log(this.datosLogin[0].usuario);
                                    console.log(this.datosLogin[0].vendedor);
                                    localStorage.setItem('codigoCliente',this.datosLogin[0].codigoCliente);
                                    localStorage.setItem('denominacion',this.datosLogin[0].denominacion);
                                    localStorage.setItem('vendedor',this.datosLogin[0].vendedor);
                                    localStorage.setItem('usuario',this.datosLogin[0].usuario);
                                    localStorage.setItem('recordarToken','1');
                                    this.authService.token = 'true';
                                    this.authService.codCliente = this.datosLogin[0].codigoCliente;
                                    localStorage.setItem('metodo','usuario');
                                 }
                                this.router.navigate(['/slides']);                                      
                                }else{
                                   this.errorLogin();
                                   console.log("Error login");
                                }
                          },
                          (error) =>{
                            console.error(error);
                                }// error
                              )    
  }

async errorLogin() {
  let toast = await this.toastController.create({
    message: 'Usuario o Contraseña incorrecta',
    duration: 2000,
    position: "bottom"

  });

  toast.present();
}

}//End Class
