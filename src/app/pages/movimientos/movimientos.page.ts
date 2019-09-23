import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {

 movimientos : any;
 totalCredito : any;

  constructor( private authService:AuthService,
              public http: HttpClient) { }

 

  ngOnInit() {

     this.authService.getMovimientos()
    .subscribe(
      (data) => { // Success
             
             this.movimientos = data;
             console.log(this.movimientos);
              this.calcularSaldo();
      },
      (error) =>{
        console.error(error);
            }// error
          )
  }//End NgOnInit

  calcularSaldo(){
      var acumulador : number = 0;
       for(var i = 0; i < this.movimientos.length; i++){

           acumulador = acumulador + this.movimientos[i].Saldo;
          
       }
       this.totalCredito = acumulador;
  }//End CalcularSaldo

}//End Class
