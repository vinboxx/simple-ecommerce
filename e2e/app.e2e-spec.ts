import { SimpleEcommercePage } from './app.po';

describe('simple-ecommerce App', function() {
  let page: SimpleEcommercePage;

  beforeEach(() => {
    page = new SimpleEcommercePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
