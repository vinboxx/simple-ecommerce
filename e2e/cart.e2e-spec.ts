import { SimpleEcommercePage } from './app.po';

describe('Basket page', function() {
    let page: SimpleEcommercePage;

    beforeEach(() => {
        page = new SimpleEcommercePage();
    });

    it('should add some products to cart', () => {

        // Clear cart before test
        page.clearCart();

        page.navigateTo('/catalog');

        let buyButton = page.select('.mdl-card .mdl-button');
        expect(buyButton.count()).toEqual(4);

        // Remember total items before
        let prev = 0;
        page.getTotalItem().then(function (itemBefore) {
            prev = itemBefore;
            expect(itemBefore).toBe(0);
        });

        // Add multiple products
        buyButton.each(function(element, index) {
            element.click();
        });

        // Expect new total items
        page.getTotalItem().then(function (itemAfter) {
            expect(itemAfter).toBeGreaterThan(prev);
        });

    });

    it('should navigate to basket page and display items in cart', () => {
        page.navigateTo('/basket');

        let items = page.select('.mdl-data-table tr');

        expect(items.count()).toBeGreaterThan(0);
    });

    it('should update total items when change qty', () => {
        // Select input
        let qtyInputList = page.select('.mdl-data-table .mdl-textfield__input');
        expect(qtyInputList.count()).toBeGreaterThan(0);

        // Remember total price before
        let prev = 0;
        page.getTotalPrice().then(function (priceBefore) {
            prev = priceBefore;
            expect(priceBefore).toBeGreaterThan(0);
        });

        // Change input value
        qtyInputList.first().clear();
        qtyInputList.first().sendKeys('100');

        // Expect new total price
        page.getTotalPrice().then(function (priceAfter) {
            expect(priceAfter).toBeGreaterThan(prev);
        });
    });

    it('should delete item when click delete button', () => {
        // Select delete buttons
        let deleteButtonList = page.select('.mdl-data-table .delete-btn');
        expect(deleteButtonList.count()).toBeGreaterThan(0);

        // Remember total item before
        let prev = 0;
        page.getTotalItem().then(function (priceBefore) {
            prev = priceBefore;
            expect(priceBefore).toBeGreaterThan(0);
        });

        // Click delete line
        deleteButtonList.first().click();

        // Expect new total item
        page.getTotalItem().then(function (priceAfter) {
            expect(priceAfter).toBeLessThan(prev);
        });
    });

    it('should clear cart when click empty-cart button', () => {
        // Select empty-cart button
        let emptyCartButton = page.select('#empty-cart');
        expect(emptyCartButton.count()).toBe(1);

        // Click empty-cart button
        emptyCartButton.click();

        // Expect total item to be 0
        page.getTotalItem().then(function (priceAfter) {
            expect(priceAfter).toBe(0);
        });
    });
});
