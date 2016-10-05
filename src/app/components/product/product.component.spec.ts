/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { ProductComponent } from './product.component';

import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRouteStub } from '../../../testing/router-stubs';

let activatedRoute: ActivatedRouteStub;
let fixture: ComponentFixture<ProductComponent>;
let cartService: CartService;

describe('Component: Product', () => {

    beforeEach(() => {

        activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = { id: 1 };

        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [
                ProductComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute
                },
                CatalogService,
                CartService,
                StorageService
            ]
        });

        // Create component and test fixture
        fixture = TestBed.createComponent(ProductComponent);

        fixture.detectChanges();
    });

    beforeEach( async(() => {
        fixture.detectChanges();
    }));

    it('should create an instance', () => {
        expect(fixture).toBeTruthy();
    });

    it('should get a service instance', inject([CartService], (_service: CartService) => {
        cartService = _service;
        expect(cartService).toBeTruthy();
    }));

    it('should render product page and can click buy button', () => {

        fixture.whenStable().then(() => {

            fixture.detectChanges();

            let totalItemBefore = cartService.getTotalItem();

            // Get only one button to test
            const btn = fixture.nativeElement.querySelector('button');

            // Trigger click event
            btn.click();

            // Refresh Cart
            cartService.refreshCart();

            let totalItemAfter = cartService.getTotalItem();

            let result = totalItemAfter > totalItemBefore;
            expect(result).toBeTruthy();

            // Clear cart after test
            cartService.clearCart();
        });

    });
});
