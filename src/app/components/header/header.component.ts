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

  constructor(private cartService: CartService) {
    this.cartTotalItem = this.cartService.getTotalItem();
  }

  ngOnInit() {
  }

}
