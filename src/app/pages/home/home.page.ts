import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  goToMiPedido() {
    this.router.navigate(['/mi-pedido']);
  }

  goToMovimientos() {
    this.router.navigate(['/movimientos']);
  }
  
  goToAutogestion() {
       window.open('http://femaco.com.ar/Account/LogOn', '_blank');

  }
}
