import puppeteer from 'puppeteer';

// Function to render HTML to image
export async function renderToImage(html: string) {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setContent(html);

  const imageBuffer = await page.screenshot();

  await browser.close();

  return imageBuffer;
}

// Function to convert image buffer to data URL
export function bufferToDataURL(buffer: Buffer) {
  const base64 = buffer.toString('base64');
  return `data:image/png;base64,${base64}`;
}
