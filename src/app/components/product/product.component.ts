import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    private product;

    constructor(
        private route: ActivatedRoute,
        private catalogService: CatalogService,
        private cartService: CartService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.catalogService.getById(id)
            .then(product => {
                this.product = product;
            });
        });
    }

    /**
     * function is used by template
     * add product to cart
     */
    addToCart(product: any) {
        this.cartService.addItem(product);
    }

}
