import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../models/item.model';

import { CatalogMock } from '../mock/catalog.mock.json';

@Injectable()
export class CatalogService {
    private catalog: Item[];
    serviceEvent$: EventEmitter<Item[]> = new EventEmitter();

    constructor() {
        this.getCatalog();
    }

    getCatalog(): Promise<Item[]> {
        return Promise.resolve(CatalogMock).then(
          catalog => this.catalog = catalog
        );
    }

    setCatalog(catalog: Item[]) {
        this.catalog = catalog;
    }

    getById(id: number): Promise<Item> {
        return this.getCatalog()
               .then(products => products.find(item => item.id === id ));
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
