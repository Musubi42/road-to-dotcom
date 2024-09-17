import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

const stealth = stealthPlugin();
chromium.use(stealth);

const URL = "https://animehunch.com/new-lord-of-the-rings-anime-film-highlights-franchises-first-female-lead-first-look-release-date-other-details-revealed/";

const startTime = new Date();

const options = {
  headless: true,
  // proxy: {
    // Proxy manager
    server: 'http://127.0.0.1:24000',
    // Proxy bright data - Datacenter proxies
    // server: 'http://brd.superproxy.io:22225',
    // username: 'brd-customer-hl_5e7e7013-zone-scrape_test2',
    // password: 'a7rvsam5gwjj'
  // },
  ignoreHTTPSErrors: true,
};

chromium.launch(options).then(async browser => {
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    javaScriptEnabled: true,
  });

  // Check IP address
  const ipCheckPage = await context.newPage();
  await ipCheckPage.goto('https://httpbin.org/ip');
  const ipInfo = await ipCheckPage.evaluate(() => JSON.parse(document.body.textContent));
  console.log('Using IP Address:', ipInfo.origin);

  await ipCheckPage.close();


  const page = await context.newPage();


  await page.goto(URL);
var articleContent = {
    title: "",
    imageUrls: [],
    textContent: []
};

  const formatText = (inputText) => {
    const paragraphs = inputText.split('\n\n');
    const sections = paragraphs.filter(paragraph => paragraph.trim().length > 0).map(paragraph => paragraph.trim());
    return sections;
  }

// Execute script within the page context
const { title, imageUrls, textContent } = await page.evaluate(() => {
    const article = document.querySelector('wp-block-ultimate-post-column ultp-block-5ddd14');
    const title = document.querySelector('h1.ultp-builder-title').innerText;
    const imageUrls = Array.from(document.querySelectorAll('.wp-block-ultimate-post-column.ultp-block-5ddd14 .wp-block-image img')).map(img => img.dataset.lzlSrc);
    const textContent = document.querySelector('.wp-block-ultimate-post-post-content.ultp-block-740ee2').innerText;
    return { title, imageUrls, textContent }; // Return an object with the title
});

const formattedTextContent = formatText(textContent);


  articleContent = { title, imageUrls, textContent: formattedTextContent };

  console.log("ArticleContent : ", articleContent);

  await browser.close();
});
