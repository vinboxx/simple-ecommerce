import { SimpleEcommercePage } from './app.po';

describe('Product page', function() {
    let page: SimpleEcommercePage;

    beforeEach(() => {
        page = new SimpleEcommercePage();
    });

    it('should navigate to product page', () => {
        // Clear cart before test
        page.clearCart();

        page.navigateTo('/item/2');
        expect(page.selectText('.mdl-card__title-text')).toEqual('Iphone 6');
    });

    it('should display product image', () => {
        let img = page.select('.mdl-cell img');
        expect(img.count()).toBe(1);

        expect(img.getAttribute('src')).toBeDefined();
    });

    it('should add product to cart', () => {

        let buyButton = page.select('.mdl-cell .mdl-button');
        expect(buyButton.count()).toEqual(1);

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
