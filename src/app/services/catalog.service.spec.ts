/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatalogService } from './catalog.service';
import { CatalogMock } from '../mock/catalog.mock.json';
import { Item } from '../models/item.model';

describe('Service: Catalog', () => {

    let mockProducts = CatalogMock;
    let service: CatalogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CatalogService]
        });
    });

    it('should get a service instance', inject([CatalogService], (_service: CatalogService) => {
        service = _service;
        expect(service).toBeTruthy();
    }));

    it('should wait for CatalogService.getCatalog',  done => {
        service.getCatalog().then(products => {
            let result = mockProducts.length === products.length;
            expect(result).toBeTruthy();
            done();
        });
    });

    it('should wait for CatalogService.getById',  done => {
        service.getById(mockProducts[1].id).then(product => {
            let result = mockProducts[1].id === product.id;
            expect(result).toBeTruthy();
            done();
        });
    });

    it('should filter products', () => {

        // Subscribe to service event
        let productList: Item[];
        let subscriber = service.serviceEvent$.subscribe((products: Item[]) => {
            productList = products;
        });

        // Make change
        let filter = mockProducts[1].filters;
        service.filter(filter);

        // Unsubscribe
        subscriber.unsubscribe();

        // Compare result
        let result = (productList && productList.length >= 1) ? true : false;
        expect(result).toBeTruthy();
    });
});
