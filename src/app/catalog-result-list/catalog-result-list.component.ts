import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ProductModel } from '../catalog/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalog-result-list',
  templateUrl: './catalog-result-list.component.html',
  styleUrls: ['./catalog-result-list.component.css']
})
export class CatalogResultListComponent implements OnInit {

  private subscriber: EventEmitter<ProductModel[]>;

    products: ProductModel[] = [];
    productCount: number = 0;

    constructor(private _service: ProductService) {
    }

    /**
     * update variables used in the template (change detection)
     */
    private updateProducts(products: ProductModel[]) {
        this.productCount = products.length;
        this.products = products.slice(0, 20);
    }

    ngOnInit() {
        /**
         * subscribe to the update event of ProductService to keep result-list in sync
         */
        this.subscriber = this._service.serviceEvent$.subscribe((products: ProductModel[])=> {
            this.updateProducts(products);
        });

        /**
         * load all products to display the initial list
         */
        this._service.load().then((products: ProductModel[])=> {
            this.updateProducts(products);
        });
    }

    ngOnDestroy() {
        /**
         * unsubscribe from ProductService event
         */
        this.subscriber.unsubscribe();
    }

}
