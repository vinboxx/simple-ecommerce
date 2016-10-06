import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: () => new Promise(function (resolve) {
        require.ensure([], function (require) {
            resolve(require('./modules/catalog/catalog.module')['CatalogModule']);
        });
    })
  },
  { path: 'item/:id', component: ProductComponent },
  { path: 'basket', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SimpleEcommerceRoutingModule { }
