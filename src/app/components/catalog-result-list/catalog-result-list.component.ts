import { Component, OnInit, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog-result-list',
  templateUrl: './catalog-result-list.component.html',
  styleUrls: ['./catalog-result-list.component.css']
})
export class CatalogResultListComponent implements OnInit {

    private subscriber: EventEmitter<Item[]>;
    private isAddingProduct: boolean = false;
    private products: Item[] = [];
    private productCount: number = 0;

    constructor(private _service: CatalogService) {
    }

    /**
     * update variables used in the template (change detection)
     */
    private updateProducts(products: Item[]) {
        this.productCount = products.length;
        this.products = products.slice(0, 20);
    }

    ngOnInit() {
        /**
         * subscribe to the update event of CatalogService to keep result-list in sync
         */
        this.subscriber = this._service.serviceEvent$.subscribe((products: Item[]) => {
            this.updateProducts(products);
        });

        /**
         * load all products to display the initial list
         */
        this._service.getCatalog().then((products: Item[]) => {
            this.updateProducts(products);
        });
    }

    ngOnDestroy() {
        /**
         * unsubscribe from CatalogService event
         */
        this.subscriber.unsubscribe();
    }

    /**
     * function is used by template
     * add product to cart
     */
    addToCart(product: any) {
        this.isAddingProduct = product;
        let self = this;
        setTimeout(function () {
            self.isAddingProduct = null;
        }, 1000);

    }

}
