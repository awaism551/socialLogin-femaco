import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
    
     products: any;
     private items: any;
     cantidad : number;

  constructor(private authService:AuthService,
              public toastController: ToastController) {
    this.initializeItems();
     }

  ngOnInit() {


  	 this.authService.getProducts()
    .subscribe(
      (data) => { // Success
             this.products = data;
             this.items = data;
         
      },
      (error) =>{
        console.error(error);
            }// error
          )
     
  }//end NgOnInit

  initializeItems() {
    this.items = this.products;
  }

  gregarProducto(codigo, desc, um){

     this.authService.setProducto(codigo,desc, um);
     this.cantidad = this.authService.cantidadComprada;
     //console.log("Producto agregado: "+desc);
     this.prodAgregado();
    }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async prodAgregado() {
  let toast = await this.toastController.create({
    message: 'Producto agregado correctamente',
    duration: 1000,
    position: "bottom"

  });

  toast.present();
}


}
