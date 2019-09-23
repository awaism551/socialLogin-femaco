import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'icono-home.png'
    },
    {
      title: 'Productos',
      url: '/productos',
      icon: 'icono-productos.png'
    },
    {
      title: 'Mi Pedido',
      url: '/mi-pedido',
      icon: 'icono-mi-pedido.png'
    },
    {
      title: 'Movimientos',
      url: '/movimientos',
      icon: 'icono-movimientos.png'
    },
    {
      title: 'Cerrar sesión',
      url: '/login',
      icon: 'icono-cerrar-sesion.png'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
