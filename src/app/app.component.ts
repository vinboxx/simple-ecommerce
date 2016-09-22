import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StorageService, CartService]
})
export class AppComponent {
}
