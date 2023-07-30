import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { render } from 'ejs';

(async () => {
  const template = readFileSync('./template.html', { encoding: 'utf-8' });
  const users = [
    { id: '1', first: 'Namibian', last: 'Chitta', handle: '@cheetah' },
    { id: '2', first: 'Bokya', last: 'Bhau', handle: '@bokyabhau' },
    { id: '3', first: 'Vigilant', last: 'Doc', handle: '@VigilantDoc' },
  ];

  const htmlMarkup = render(template, { users });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlMarkup);

  await page.pdf({
    path: 'report.pdf',
    format: 'letter',
  });

  await browser.close();
})();
