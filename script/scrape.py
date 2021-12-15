from bs4 import BeautifulSoup
import requests
import argparse
import json

def etsy_single(etsy_link):
  etsy_page = requests.get(etsy_link).text
  soup = BeautifulSoup(etsy_page, 'html.parser')

  # getting image
  image_div = soup.find('div', class_='listing-page-image-carousel-component')
  listing_id = image_div['data-palette-listing-id']
  first_img = image_div.find('img')['src']
  title = soup.title.getText()

  # getting other info
  listing_page = soup.find('div', id='listing-page-cart')
  price = listing_page.find('div', attrs={'data-buy-box-region': 'price'}).p.getText(strip=True)
  numSales = listing_page.find('span', class_='wt-text-caption').getText()
  ratings = listing_page.find('input', attrs={'name': 'rating'})['value']

  data = {}
  data['id'] = int(listing_id)
  data['title'] = title
  data['price'] = float(price.split('$')[1])
  data['num_sales'] = int(numSales.split(' ')[0].replace(',',''))
  data['rating'] = float(ratings)
  data['image'] = first_img
  data['url'] = etsy_link

  print(json.dumps(data))

  # with open('data.txt', 'w') as outfile:
  #   json.dump(data, outfile)

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Fetch single product from Etsy')
  parser.add_argument('links', nargs='+',help='etsy product link')
  parser.add_argument('-o','--output', nargs=1, help='output file link')
  args = parser.parse_args()
  for link in args.links:
    etsy_single(link)
