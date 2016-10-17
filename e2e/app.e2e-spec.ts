import { SimpleEcommercePage } from './app.po';

describe('simple-ecommerce App', function() {
    let page: SimpleEcommercePage;

    beforeEach(() => {
        page = new SimpleEcommercePage();
    });

    it('should display app title', () => {
        page.navigateTo('/');
        expect(page.getAppTitle()).toEqual('Ng2 Simple Cart');
    });

});
