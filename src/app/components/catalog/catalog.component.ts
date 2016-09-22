import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from "../../services/cart.service";
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService, CartService]
})
export class CatalogComponent implements OnInit {

  public catalog: Item[] = [];
  public search: string = '';

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit() {
    this.catalogService.getCatalog().then((catalog) => {
      this.catalog = catalog;
    });
  }

}
