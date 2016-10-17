import { browser, element, by } from 'protractor';

export class SimpleEcommercePage {
    navigateTo(url = '/') {
        return browser.get(url);
    }

    clearCart() {
        browser.get('/basket');
        this.select('#empty-cart').click();
    }

    getAppTitle() {
        return this.selectText('app-root .mdl-layout-title');
    }

    select(selector: string) {
        return element.all(by.css(selector));
    }

    selectText(selector: string) {
        return element.all(by.css(selector)).first().getText();
    }

    getTotalItem() {
        return this.selectText('.cart-total-item').then(function (totalItem) {
            return parseInt(totalItem);
        });
    }

    getTotalPrice() {
        return this.selectText('.cart-total-price').then(function (price) {
            return parseInt(price.substr(1).replace(',', ''));
        });
    }
}
