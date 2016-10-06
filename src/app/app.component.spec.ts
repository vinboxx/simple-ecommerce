/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { StorageService } from './services/storage.service';
import { CartService } from './services/cart.service';
import { CatalogService } from './services/catalog.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('App: SimpleEcommerce', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent
            ],
            providers: [
                StorageService,
                CatalogService,
                CartService
            ],
            imports: [ RouterTestingModule ]
        });
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
