import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { SharedModule } from './shared/shared.module';
import { StorageService } from './services/storage.service';
import { CartService } from './services/cart.service';
import { CatalogService } from './services/catalog.service';

import { AppComponent } from './app.component';
import { SimpleEcommerceRoutingModule }  from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        PageNotFoundComponent,
        ProductComponent,
        CartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SimpleEcommerceRoutingModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
            deps: [Http]
        }),
        SharedModule.forRoot(),
    ],
    providers: [
        StorageService,
        CatalogService,
        CartService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
