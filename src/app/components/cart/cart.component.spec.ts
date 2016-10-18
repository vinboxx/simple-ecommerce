/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

describe('Component: Cart', () => {

    beforeEach(() => {
        // Refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [ CartComponent ],
            providers: [
                CartService,
                StorageService,
                { provide: Router }
            ],
            imports: [
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
                    deps: [Http]
                })
            ]
        });
    });

    it('should create an instance', () => {
        // Create component and test fixture
        let fixture = TestBed.createComponent(CartComponent);
        expect(fixture).toBeTruthy();
    });

});
