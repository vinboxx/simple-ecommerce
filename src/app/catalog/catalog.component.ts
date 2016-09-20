import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [ProductService]
})
export class CatalogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
