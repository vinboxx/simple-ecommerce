/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Http } from '@angular/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';

let comp:    HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('Component: Header', () => {

    beforeEach(() => {
        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
            providers: [
                CartService,
                StorageService
            ],
            imports: [
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
                    deps: [Http]
                })
            ]
        });

        // Create component and test fixture
        fixture = TestBed.createComponent(HeaderComponent);

        // Get component instance
        comp = fixture.componentInstance; // HeaderComponent test instance

        comp.refreshText();
    });

    it('should create an instance', () => {
        expect(fixture).toBeTruthy();
    });

    it('should display original title', () => {

        // Trigger change detection to update the view
        fixture.detectChanges();

        // Query for the title by CSS element selector
        de = fixture.debugElement.query(By.css('.mdl-layout-title'));
        el = de.nativeElement;

        // Confirm the element's content
        expect(el.textContent).toContain(comp.appTitle);
    });

    it('should display a different test title', () => {

        // Change component title
        comp.appTitle = 'Test Title';

        // Trigger change detection to update the view
        fixture.detectChanges();

        // Query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('.mdl-layout-title'));
        el = de.nativeElement;

        // Confirm the element's content
        expect(el.textContent).toContain('Test Title');
    });
});
