/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';

let fixture: ComponentFixture<CatalogComponent>;
let cartService: CartService;

describe('Component: Catalog', () => {

    beforeEach(() => {
        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [
                CatalogComponent,
                SidebarComponent
            ],
            providers: [
                CatalogService,
                CartService,
                StorageService,
                {
                    provide: Router,
                    useClass: class { navigate = jasmine.createSpy('navigate'); }
                }
            ]
        });

        // Create component and test fixture
        fixture = TestBed.createComponent(CatalogComponent);
    });

    it('should get a service instance', inject([CartService], (_service: CartService) => {
        cartService = _service;
        expect(cartService).toBeTruthy();
    }));

    it('should render product cards and can click buy button', done => {
        fixture.componentInstance.getCatalog().then(() => {

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

            done();
        });
    });

    it('should navigate to a product page', done => {

        // Get the router from the testing NgModule
        const router = TestBed.get(Router);

        fixture.componentInstance.getCatalog().then(() => {

            fixture.detectChanges();

            // Get first product card
            const heading = fixture.nativeElement.querySelector('.mdl-card__title-text');

            // Expect heading to have product name "Iphone 6S"
            expect(heading.textContent.trim() === 'Iphone 6S').toBeTruthy();

            // Find the link and click
            heading.children[0].click();

            // Expect router to navigate to /item/1
            expect(router.navigate).toHaveBeenCalledWith(['/item', 1]);
            done();
        });
    });
});
