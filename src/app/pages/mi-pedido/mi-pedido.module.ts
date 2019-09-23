import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiPedidoPage } from './mi-pedido.page';
import { FormGroup, FormArray, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MiPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [MiPedidoPage]
})
export class MiPedidoPageModule {}
