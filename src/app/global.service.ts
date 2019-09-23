import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor( public alertController: AlertController ) { }

    async showAlert(titulo, mensaje, boton) {
      const alert = await this.alertController.create({
        header: titulo,
        message: mensaje,
        buttons: [boton]
      });
  
      await alert.present();
    }
}
