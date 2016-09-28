import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private cart;

    constructor(private cartService: CartService) {
        this.cart = cartService.getCart();
    }

    ngOnInit() {
    }

    updateItem(item: Item, event: any) {
        item.qty = event.target.value;
        item.totalPrice = item.qty * item.price;
        this.cartService.updateItem(item);
    }

    deleteItem(item: Item) {
        this.cartService.deleteItem(item);
        this.cart = this.cartService.getCart();
    }

    clearCart() {
        this.cartService.clearCart();
        this.cart = this.cartService.getCart();
    }

}
