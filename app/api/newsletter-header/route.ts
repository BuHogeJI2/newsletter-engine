import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';
import { bufferToDataURL, renderToImage } from '@/libs';

export async function GET() {
  const templatePath = path.resolve('./templates/page/page.ejs');
  const templateString = fs.readFileSync(templatePath, 'utf-8');

  const imageTemplatePath = path.resolve('./templates/image/image.ejs');
  const imageTemplateString = fs.readFileSync(imageTemplatePath, 'utf-8');

  // Render the template with data by using EJS
  const html = ejs.render(templateString, {
    title: 'My Newsletter',
    heading: 'Welcome to My Newsletter',
    message: 'Here is some important content.',
  });

  const cssPath = path.resolve('./templates/page/page.css');
  const cssString = fs.readFileSync(cssPath, 'utf-8');

  // Inline the CSS styles into the HTML by using Juice
  const htmlWithStyles = juice.inlineContent(html, cssString);

  // Render the HTML to an image by using Puppeteer
  const imageBuffer = await renderToImage(htmlWithStyles);

  // Render the image template with data by using EJS
  const imageHTML = ejs.render(imageTemplateString, {
    src: bufferToDataURL(imageBuffer),
  });

  return new Response(imageHTML, {
    headers: { 'content-type': 'text/html' },
    status: 200,
  });
}
