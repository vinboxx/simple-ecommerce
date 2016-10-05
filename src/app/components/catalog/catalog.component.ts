import { Component, OnInit, OnDestroy, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../models/item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

    public catalog: Item[] = [];
    public search: string = '';

    private subscriber: EventEmitter<Item[]>;
    private isAddingProduct: boolean = false;
    private products: Item[] = [];
    private productCount: number = 0;
    selectedProduct: Item;

    subscription: Subscription;

    constructor(private catalogService: CatalogService, private cartService: CartService, private router: Router) {
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
        this.getCatalog();
    }

    ngOnDestroy() {
        /**
         * unsubscribe from CatalogService event
         */
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }

        /**
         * unsubscribe from CartService event
         */
        if (this.subscriber) {
            this.subscription.unsubscribe();
        }
    }

    getCatalog(): Promise<Item[]> {
        return this.catalogService.getCatalog().then((products: Item[]) => {
            this.catalog = products;
            this.updateProducts(products);
        });
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

    gotoDetail(product: Item) {
        this.router.navigate(['/item', product.id]);
        return false;
    }

    /**
     * update variables used in the template (change detection)
     */
    private updateProducts(products: Item[]) {
        this.productCount = products.length;
        this.products = products.slice(0, 20);
    }

}
