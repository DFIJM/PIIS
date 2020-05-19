import { AppPage } from './app.po';
import { browser, logging, ExpectedConditions } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', async () => {
    await page.navigateTo();
    browser.waitForAngularEnabled(true);
    browser.wait(ExpectedConditions.titleIs('YELLOW PAGES'), 5000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
