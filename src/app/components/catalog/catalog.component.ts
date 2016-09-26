import { Component, OnInit, EventEmitter  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from "../../services/cart.service";
import { Item } from '../../models/item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {

    public catalog: Item[] = [];
    public search: string = '';

    private subscriber: EventEmitter<Item[]>;
    private isAddingProduct: boolean = false;
    private products: Item[] = [];
    private productCount: number = 0;

    subscription: Subscription;

    constructor(private catalogService: CatalogService, private cartService: CartService) {
        this.subscription = cartService.totalItem$.subscribe(
            totalItem => {}
        );
        this.subscription = cartService.totalPrice$.subscribe(
            totalPrice => {}
        );
    }

    ngOnInit() {

        /**
         * subscribe to the update event of CatalogService to keep result-list in sync
         */
        this.subscriber = this.catalogService.serviceEvent$.subscribe((products: Item[]) => {
            this.updateProducts(products);
        });

        /**
         * load all products to display the initial list
         */
        this.catalogService.getCatalog().then((products: Item[]) => {
            this.catalog = products;
            this.updateProducts(products);
        });
    }

    ngOnDestroy() {
        /**
         * unsubscribe from CatalogService event
         */
        this.subscriber.unsubscribe();

        /**
         * unsubscribe from CartService event
         */
        this.subscription.unsubscribe();
    }

    /**
     * function is used by template
     * add product to cart
     */
    addToCart(product: any) {
        this.isAddingProduct = product;
        this.cartService.addItem(product);
        this.isAddingProduct = null;
    }

    /**
     * update variables used in the template (change detection)
     */
    private updateProducts(products: Item[]) {
        this.productCount = products.length;
        this.products = products.slice(0, 20);
    }

}
