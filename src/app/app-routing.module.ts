import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'loginbyuser', loadChildren: './pages/loginbyuser/loginbyuser.module#LoginbyuserPageModule' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'mi-pedido', loadChildren: './pages/mi-pedido/mi-pedido.module#MiPedidoPageModule' },
  { path: 'movimientos', loadChildren: './pages/movimientos/movimientos.module#MovimientosPageModule' },
  { path: 'productos', loadChildren: './pages/productos/productos.module#ProductosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
