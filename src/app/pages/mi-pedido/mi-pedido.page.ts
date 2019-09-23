import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthService} from '../../auth.service';
import { FormGroup, FormArray, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {
  
  pedido = [];
  pasoUno: boolean = true;
  pasoDos: boolean = false;
  todo : FormGroup;
  obs : any ;
  fecha : string;
  proyectoEntrega : string;
  pedidos3 : [];
  cantidadProd = [];
  cantidad = this.authService.cantidadComprada;
  proyectos : any;
  ultPedido : any;
  constructor( private global: GlobalService,
               private authService:AuthService,
               public formBuilder: FormBuilder,
               public toastController: ToastController) {

   this.pedido = authService.getMisProductos();
   this.todo = this.formBuilder.group({
      cantidad2: ['', Validators.required]
      
    });
  }

  ngOnInit() {


     console.log(this.authService.cantidadComprada);
     this.authService.getProyectos()
    .subscribe(
      (data) => { // Success
             this.proyectos = data;
             //console.log("Proyectos" +this.proyectos[0].descProyecto);
      },
      (error) =>{
        console.error(error);
            }// error
          )
  }

  
  goToPasoUno() {
    this.pasoUno = true;
    this.pasoDos = false;
  }

  goToPasoDos() {
    this.pasoUno = false;
    this.pasoDos = true;
  }


  getProyectos(){
    this.proyectos = this.authService.getProyectos();
  }

  goToFinalizar() {
 

    var valida = this.valida();
    if (valida == true){
      this.authService.postPedido(this.obs, this.proyectoEntrega, this.fecha);
       console.log("las siguientes lineas, deberian estar vacias");
       //this.pedidos3.length = 0;
       this.cantidad = 0;
       this.authService.objetoJSON1 = {"Pedido" : [], "nroPedido":0,"InfoPedido" : []};
       console.log(this.pedidos3);
       console.log(this.authService.objetoJSON1);

        console.log('VACIE LAS VARIABLES');
        this.authService.cantidadComprada=0;
        this.authService.productosArray = [];
        this.global.showAlert('¡GRACIAS!', 'Hemos recibido tu solicitud.', 'Aceptar');
    }

  }

  logForm(prod,cantidad2){
    var cant =this.todo.get('cantidad2').value;
    console.log("Cantidad seleccionada: "+cant);
    this.authService.setCantidad(prod, cant);
  }

  quitar(prod){
        this.authService.deleteProducto(prod);
     
  }

  valida(){
    var rta = true;
    if (this.obs == undefined && this.fecha == undefined ){
        rta = false;
        var message ="Debe ingresar Proyecto y Fecha Entrega";
        this.errorForm(message);
    }else {
    if (this.fecha == undefined || this.obs == undefined){
       rta = false;
       var message = "Debe ingresar un Proyecto y una Fecha";
        this.errorForm(message);
    }}
      return rta;
  }

  async errorForm(message) {
  let toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: "bottom"

  });
  toast.present();
  }//End Errorform

  mostrarProductos(){
       // this.pedidos3 = this.authService.getProductos();
        this.cantidadProd = this.authService.getCantidad();
  }// fin mostraproducto
}
