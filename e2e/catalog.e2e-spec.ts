import { SimpleEcommercePage } from './app.po';

describe('Catalog page', function() {
    let page: SimpleEcommercePage;

    beforeEach(() => {
        page = new SimpleEcommercePage();
    });

    it('should navigate to catalog page', () => {
        // Clear cart before test
        page.clearCart();

        page.navigateTo('catalog');
        expect(page.selectText('.mdl-card__title-text a')).toEqual('Iphone 6S');
    });

    it('should display filter', () => {
        let chkboxList = page.select('.mdl-card__title-text a');
        expect(chkboxList.count()).toBeGreaterThan(0);
    });

    it('should filter products when click checkbox', () => {
        let cardList = page.select('.mdl-card');
        expect(cardList.count()).toEqual(4);

        let firstChkbox = page.select('.checkbox input[type="checkbox"]').first();
        firstChkbox.click();
        expect(firstChkbox.isSelected()).toBe(true);

        cardList = page.select('.mdl-card');
        expect(cardList.count()).toEqual(2);

        // Uncheck filter
        firstChkbox.click();
    });

    it('should add product to cart', () => {
        let buyButton = page.select('.mdl-card .mdl-button');
        expect(buyButton.count()).toEqual(4);

        let prev = 0;
        page.selectText('.cart-total-item').then(function (itemBefore) {
            prev = parseInt(itemBefore);
            let result = prev >= 0;
            expect(result).toBe(true);
        });

        buyButton.first().click();

        page.selectText('.cart-total-item').then(function (itemAfter) {
            let text = parseInt(itemAfter);
            expect(text).toBeGreaterThan(prev);
        });

    });
});
