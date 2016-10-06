/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Item } from '../../../models/item.model';
import { SidebarComponent } from './sidebar.component';
import { CatalogService } from '../../../services/catalog.service';

let comp: SidebarComponent;
let fixture: ComponentFixture<SidebarComponent>;

let spy: jasmine.Spy;
let de: DebugElement;
let el: HTMLElement;
let catalogService: CatalogService; // the actually injected service

describe('Component: Sidebar', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SidebarComponent ],
            providers:    [ CatalogService ]
        });

        fixture = TestBed.createComponent(SidebarComponent);
    });

    beforeEach( async(() => {
        fixture.detectChanges();
    }));

    it('should filter products after catalog loaded', async(() => {

        // CatalogService actually injected into the component
        catalogService = fixture.debugElement.injector.get(CatalogService);

        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async

            fixture.detectChanges(); // update view

            // Subscribe to service event
            let productList: Item[];
            let subscriber = catalogService.serviceEvent$.subscribe((products: Item[]) => {
                productList = products;
            });

            // Get the element by CSS selector (e.g., by class name)
            de = fixture.debugElement.query(By.css('input:not([disabled])'));
            el = de.nativeElement;

            el.click();

            // Unsubscribe
            subscriber.unsubscribe();

            // Compare result
            let result = (productList && productList.length >= 1) ? true : false;
            expect(result).toBeTruthy();
        });
    }));

});
