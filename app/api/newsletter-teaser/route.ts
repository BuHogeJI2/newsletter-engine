import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import juice from 'juice';

export async function GET(req: Request) {
  const newsletterTeaserPath = path.resolve(
    './templates/newsletter-teaser/horizontal-one/horizontal-one.ejs',
  );
  const newsletterTeaserString = fs.readFileSync(newsletterTeaserPath, 'utf-8');

  const cssPath = path.resolve(
    './templates/newsletter-teaser/horizontal-one/horizontal-one.css',
  );
  const cssString = fs.readFileSync(cssPath, 'utf-8');

  // Render the template with data by using EJS
  const html = ejs.render(newsletterTeaserString, {
    hub: false,
    baseUrl: '',
    hotelUrl:
      'https://www.migros-ferien.ch/moevenpick-resort-el-quseir-el-quseir-marsa-alam.hotel?request_type=package&adults=2&room_count=2-0&duration_type=flex&duration%5Bmin%5D=7&duration%5Bmax%5D=7&departure_date=2023-10-09&return_date=2024-07-09&results_per_page=10&showing_results_from=0&transfer=0&departure_airports=ZRH%3BBRN%3BBSL&board=half_board%3Bfull_board%3Bbreakfast%3Ball_inclusive',
    getTrackingName(hub: boolean, type: 'image') {
      return `${hub ? 'hub' : 'hotel'}-${type}`;
    },
    nnbccImagePrefix: '',
    image: {
      url: 'https://assets.hotelplan.com/content/MF/00/045/776/destination/de/geolisting/709704.jpg',
      alt: '',
    },
  });
  // Inline the CSS styles into the HTML by using Juice
  const htmlWithStyles = juice.inlineContent(html, cssString);

  return new Response(htmlWithStyles, {
    headers: { 'content-type': 'text/html' },
    status: 200,
  });
}
