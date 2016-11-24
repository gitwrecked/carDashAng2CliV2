import { CarAppPage } from './app.po';

describe('car-app App', function() {
  let page: CarAppPage;

  beforeEach(() => {
    page = new CarAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
