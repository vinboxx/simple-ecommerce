import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../models/item.model';

import { CatalogMock } from '../mock/catalog.mock.json';

@Injectable()
export class CatalogService {
    private catalog: Item[];
    serviceEvent$: EventEmitter<Item[]> = new EventEmitter();

    constructor() {
        this.catalog = CatalogMock;
        this.generateProducts(10, 5);
    }

    private getProductImage(id): string {
        return 'img/product-0' + parseInt(id.slice(-1), 10) + '.png';
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private generateProducts(productMax: number, filterMax: number) {
        let startId = this.catalog.length + 1;
        let j;
        let maxId = startId + productMax;

        for (startId; startId < maxId; startId++) {

            let product = Object.assign({}, this.catalog[0]);
            product.id = startId;
            product.name = 'Product ' + product.id;
            product.price = Math.floor( this.getRandomNumber(50, 150000) / 10 ) * 10;
            product.rating = this.getRandomNumber(0, 5);
            product.filters = [];
            product.image = this.getProductImage(product.id.toString());

            for (j = 0; j < filterMax; j++) {
                let id = this.getRandomNumber(1, j + 1);
                let filterId = 'feature:filter' + id + ':Filter' + id;

                if (product.filters.indexOf(filterId) < 0) {
                    product.filters.push('feature:filter' + id + ':Filter' + id);
                }
            }
            this.catalog.push(product);
        }
    }

    getCatalog() {
        return Promise.resolve(this.catalog);
    }

    setCatalog(catalog: Item[]) {
        this.catalog = catalog;
    }

    getById(id: Number): Item {
        let item: Item = null;
        this.catalog.some((catalogItem) => {
            if (catalogItem.id === id) {
                item = catalogItem;
                return true;
            }
            return false;
        });
        return item;
    }

    /**
     * filter products and emit event for all subscribers
     * @param filters string[]
     */
    filter(filters: string[]): void {
        if (filters.length === 0) {
            /**
             * if no filters are passed in to the function, emit the event with the full list of products
             */
            this.serviceEvent$.emit(this.catalog);
        } else {
            /**
             * if filters are passed in to the function, emit the event with a filtered subset of the products
             */
            this.serviceEvent$.emit(this.catalog.filter((product) => {
                let productHasAllFilters = true;

                /**
                 * every input filter has to match the products filters to get in the result-list
                 */
                filters.forEach((feature) => {
                    if (product.filters.indexOf(feature) > -1 && productHasAllFilters === true) {
                        productHasAllFilters = true;
                    } else {
                        productHasAllFilters = false;
                    }
                });

                return productHasAllFilters;
            }));
        }
    }
}
