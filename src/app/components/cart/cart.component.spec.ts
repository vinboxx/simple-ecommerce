/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';

describe('Component: Cart', () => {

    beforeEach(() => {
        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [ CartComponent ],
            providers: [
                CartService,
                StorageService,
                { provide: Router }
            ]
        });
    });

    it('should create an instance', () => {
        // Create component and test fixture
        let fixture = TestBed.createComponent(CartComponent);
        expect(fixture).toBeTruthy();
    });

});
