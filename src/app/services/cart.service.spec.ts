/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';
import { CatalogMock } from '../mock/catalog.mock.json';

describe('Service: Cart', () => {

    let products = CatalogMock;
    let service: CartService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CartService, StorageService]
        });
    });

    it('should get a service instance', inject([CartService], (_service: CartService) => {
        service = _service;
        expect(service).toBeTruthy();
    }));

    it('should add product to cart', () => {

        service.addItem(products[0]);
        let totalItem = service.getTotalItem();
        let result = totalItem === 1;

        expect(result).toBeTruthy();
    });

    it('should add two more products to cart', () => {
        service.addItem(products[1]);
        service.addItem(products[2]);
        let totalItem = service.getTotalItem();
        let result = totalItem === 3;

        expect(result).toBeTruthy();
    });

    it('should update qty of first product', () => {
        let product = products[0];
        let newQty  = 10;
        let cart    = service.getCart();
        let result  = false;

        product.qty = newQty;
        service.updateItem(product);

        // Compare qty
        for (let lineItem of cart) {
            if ((lineItem.id === product.id) && (lineItem.qty === newQty)) {
                result = true;
            }
        }

        expect(result).toBeTruthy();
    });

    it('should remove three products from cart', () => {
        service.deleteItem(products[0]);
        service.deleteItem(products[1]);
        service.deleteItem(products[2]);
        let totalItem = service.getTotalItem();
        let result = totalItem === 0;

        expect(result).toBeTruthy();
    });

    it('should get correct cart total price', () => {

        let totalPrice1 = 0;

        // Add first product
        totalPrice1 += products[0].price;
        service.addItem(products[0]);

        // Add one more product
        totalPrice1 += products[1].price;
        service.addItem(products[1]);

        // Add same product
        totalPrice1 += products[2].price;
        totalPrice1 += products[2].price;
        service.addItem(products[2]);
        service.addItem(products[2]);

        // Remove one product
        totalPrice1 -= products[0].price;
        service.deleteItem(products[0]);

        let totalPrice2 = service.getTotalPrice();
        let result = totalPrice1 === totalPrice2;

        expect(result).toBeTruthy();
    });

    it('should clear cart', () => {
        service.clearCart();
        let totalItem = service.getTotalItem();
        let result = totalItem === 0;

        expect(result).toBeTruthy();
    });
});
