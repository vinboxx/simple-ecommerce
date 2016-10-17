import { Component, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

    public supportedLangs: any[];
    public appTitle;

    cartTotalItem = 0;
    cartTotalPrice = 0;

    constructor(private cartService: CartService, private translate: TranslateService) {
        cartService.totalItem$.subscribe(
            totalItem => {
                this.cartTotalItem = totalItem;
            }
        );
        cartService.totalPrice$.subscribe(
            totalPrice => {
                this.cartTotalPrice = totalPrice;
            }
        );
        this.cartTotalItem = cartService.getTotalItem();
        this.cartTotalPrice = cartService.getTotalPrice();

        // standing data
        this.supportedLangs = [
            { display: 'EN', value: 'en' },
            { display: 'NO', value: 'no' },
            { display: '华语', value: 'zh' },
        ];

        // subscribe to language changes
        this.translate.onLangChange.subscribe(x => this.refreshText());

    }

    ngOnDestroy() {
        if (this.translate.onLangChange) {
            this.translate.onLangChange.unsubscribe();
        }
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this.translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this.translate.use(lang);
    }

    refreshText() {
        // refresh translation when language change
        this.appTitle = this.translate.instant('app title');
    }

}
