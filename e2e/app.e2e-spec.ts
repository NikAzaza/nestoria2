import { Nestoria2Page } from './app.po';

describe('nestoria2 App', () => {
  let page: Nestoria2Page;

  beforeEach(() => {
    page = new Nestoria2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
