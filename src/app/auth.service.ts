import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

const identifier = "token";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

public token : string;
 codCliente : string ;
 usuario : string ;
 email  : string ;
 denominacion : string;
 cantidadComprada : number = 0;
 productosArray = [];
 public objetoJSON1 = {"Pedido" : [], "nroPedido": 0, "InfoPedido" :[]};
 ultimoPed : any;
 ultimoPed1 : string;
 cantidadProd = [];


  constructor(  
          		public http: HttpClient,
              private googlePlus: GooglePlus,
              private nativeStorage: NativeStorage,
              private router : Router
    ) { 
      this.setUp();
      this.getUltNroPedido();
       }

setUp(){

}
getTokenFromLS():string{
  return localStorage.getItem(identifier);

}
logOut(){
navigator['app'].exitApp();
}

logOutRedes(){

  this.googlePlus.logout()
  .then(res =>{
    //user logged out so we will remove him from the NativeStorage
    this.nativeStorage.remove('google_user');
    this.router.navigate(["/login"]);
  }, err =>{
    console.log(err);
  })

}



getProducts() {

   return this.http.get('http://190.210.216.79:800/webservice/public/product');
}
getMovimientos() {
   this.codCliente = localStorage.getItem('codigoCliente');
   console.log("Consulta movimientos Cliente numero:"+this.codCliente);
   return this.http.get('http://190.210.216.79:800/webservice/public/cuenta'+'?user='+this.codCliente);
  
}

setProducto(cod, desc, um){
  var productos = {};
  var bandera = true;

  if (this.productosArray.length == 0){
     bandera = true;
  }else{
      for(var i = 0; i < this.productosArray.length; i++){
        if (this.productosArray[i].codigo == cod)
        {
          bandera = false;
        //  console.log("El codigo esta "+this.productosArray[i].codigo);
        }

      }//End For
    }//End If

    if (bandera == true){ //no encontre el producto, lo tengo que agregar
                      this.cantidadComprada = this.cantidadComprada +1;
                      console.log("Cantidad acumulada : "+this.cantidadComprada);
                       productos['codigo']       = cod;
                       productos['descripcion']  = desc;
                       productos['um']  = um;
                       productos['cant']= 0;
                       //------------QUITAR ESTO, YA QUE ESTA FIJO
                      // productos['email']  = this.email;
                      productos['usuario']=  localStorage.getItem('usuario');
                      productos['email']  = 'jpgudelj85@gmail.com';
                      //productos['usuario']= 'JPG';
                      //------------------------------
                       this.productosArray.push(productos);
                       productos= [];
    }

}//End SetProducto

getMisProductos(){
  return this.productosArray;
}

getProyectos() {
    this.codCliente = localStorage.getItem('codigoCliente');
   return this.http.get('http://190.210.216.79:800/webservice/public/proyectos'+'?user='+this.codCliente);
}

getLogin(user, pass) {
  return this.http.get('http://190.210.216.79:800/webservice/public/login'+'?user='+user+'&pass='+pass);
}

setCantidad(cod, cantidad){

for(var i = 0; i < this.productosArray.length; i++)
   {
           if (this.productosArray[i].codigo == cod.codigo)
                   
                 { //El producto esta en el arreglo,
                      this.productosArray[i].cant = cantidad;
                      this.objetoJSON1.Pedido.push(this.productosArray[i]);
                      console.log("Producto agregado a ObjetoJSON1");

                  }
               
               console.log(this.objetoJSON1);
    }

}//End setCantidad

deleteProducto(prod){
  console.log("Array de productos seleccionados:");
  console.log(this.productosArray);

for(var i = 0; i < this.productosArray.length; i++)
   {
           if (this.productosArray[i].codigo == prod.codigo)
                                
                 { 
                      this.productosArray.splice(i, 1);
                      this.cantidadComprada = this.cantidadComprada -1;
                     
                 }
    }

}// fin deleteproducto

setInfoPedido(obs, proyecto, fecha){

  var info = {};
  info['observacion']=obs;
  info['fechaentrega']='2019-07-24';//fecha;
  info['proyecto']= 'fffff';//proyecto;
  this.objetoJSON1.InfoPedido.push(info);
}

postPedido(obs, proyecto, fecha){

 // NO LLEVA CREATE AND UPDATE, SINO DA ERROR
 this.setInfoPedido(obs,proyecto,fecha);
 this.objetoJSON1.nroPedido = this.ultimoPed+1;

 console.log("objetojson1 que se envia por mail");
 console.log(this.objetoJSON1);
 
 this.http.post('http://190.210.216.79:800/webservice/public/product', 
 this.objetoJSON1

    ).subscribe(
      (data) => { // Success
             console.log("un exito el post");
             console.log(data);
             this.cantidadComprada = 0;
             this.objetoJSON1 = {"Pedido" : [], "nroPedido": 0,"InfoPedido" : []};
             this.productosArray = [];
        
      },
      (error) =>{
       console.error(error);
       console.log("No se pudo");
       this.objetoJSON1 = {"Pedido" : [], "nroPedido": 0,"InfoPedido" : []};
             this.productosArray = [];
             this.cantidadComprada = 0;
        
            }// error
          )
    this.productosArray.length = 0;
 

}//End PostPedido

 getUltNroPedido() {

  
   this.http.get('http://190.210.216.79:800/webservice/public/nropedido')
   .subscribe(
      (data) => { // Success
   
            this.ultimoPed = data;
           
      },
      (error) =>{
        console.log("Error al ejecutar WS ultimo pedido");
        console.error(error);
            }// error
          )

}

 getProductos(){

   return this.productosArray;
 }
      
 getCantidad(){
   return this.cantidadProd;
 }   

}//End Class
