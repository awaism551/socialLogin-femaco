import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  @ViewChild('slides', {static: false}) slides;

  slider: any;

  lastSlide: boolean = true;

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };

  constructor(
    private router : Router
  ) {
    
    this.slider =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            titulo: 'HOME',
            descripcion: 'Accedé rapidamente gracias a los accesos directos',
            buttonText: 'CONTINUAR',
            imageName: 'slide-home'
          },
          {
            id: 2,
            titulo: 'PRODUCTOS',
            descripcion: 'Agregá al carrito los productos que necesitás de manera muy sencilla',
            buttonText: 'CONTINUAR',
            imageName: 'slide-productos'
          },
          {
            id: 3,
            titulo: 'MI PEDIDO',
            descripcion: 'Modificá la cantidad de cada producto o simplemente eliminalo del carrito',
            buttonText: 'CONTINUAR',
            imageName: 'slide-mi-pedido'
          },
          {
            id: 4,
            titulo: 'MI PEDIDO',
            descripcion: 'Completá con los datos de tu proyecto y fecha de entrega, ¡y listo! ¡Ya nos llego tu pedido!',
            buttonText: 'CONTINUAR',
            imageName: 'slide-mi-pedido02'
          },
          {
            id: 5,
            titulo: 'MOVIMIENTOS',
            descripcion: 'Accedé a los detalles de tu cuenta corriente con toda la información necesaria',
            buttonText: 'CONTINUAR',
            imageName: 'slide-movimientos'
          },
          {
            id: 6,
            titulo: 'AUTOGESTION',
            descripcion: 'Podes consutlar el estado de tu acopio, comprobantes en PDF, consumos por cada proyecto y mas! ',
            buttonText: 'FINALIZAR',
            imageName: 'autogestion'
          }

        ]
      };

  }

  ngOnInit() {
  }

  nextSlide() {
    this.slides.isEnd().then(index => {
      if (index) {
        this.router.navigate(['/home']);
      } else {
        this.slides.slideNext();
      }
    });
  }

  SlideDidChange(slider,slideWithNav) {
    this.slides.isEnd().then(index => {
      if (index) {
        this.lastSlide = false;
      } else {
        this.lastSlide = true;
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
