import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    appTitle = 'Ng2 Simple Cart';
    cartTotalItem = 0;
    cartTotalPrice = 0;

    constructor(private cartService: CartService) {
        cartService.totalItem$.subscribe(
            totalItem => {
                this.cartTotalItem = totalItem;
            }
        );
        cartService.totalPrice$.subscribe(
            totalPrice => {
                this.cartTotalPrice = totalPrice;
            }
        );
        let cart = cartService.getCart();
        this.cartTotalItem = cartService.getTotalItem();
        this.cartTotalPrice = cartService.getTotalPrice();
    }

  ngOnInit() {
  }

}
