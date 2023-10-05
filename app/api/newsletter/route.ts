import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';

export async function GET() {
  const templatePath = path.resolve('./templates/test/test.ejs');
  const templateString = fs.readFileSync(templatePath, 'utf-8');

  // Render the template with data by using EJS
  const html = ejs.render(templateString, {
    title: 'My Newsletter',
    heading: 'Welcome to My Newsletter',
    message: 'Here is some important content.',
  });

  const cssPath = path.resolve('./templates/test/test.css');
  const cssString = fs.readFileSync(cssPath, 'utf-8');

  // Inline the CSS styles into the HTML by using Juice
  const htmlWithStyles = juice.inlineContent(html, cssString);

  return new Response(htmlWithStyles, {
    headers: { 'content-type': 'text/html' },
    status: 200,
  });
}
