from bs4 import BeautifulSoup
import requests
import argparse
import json
import re

header = {
  "User-Agent":
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582",
  "Accept-Language": "en-US,en;q=0.9,ko;q=0.8,zh-CN;q=0.7,zh;q=0.6"
  }

def amazon_scrape(amazon_link):
  header = {
    "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582",
    "Accept-Language": "en-US,en;q=0.9,ko;q=0.8,zh-CN;q=0.7,zh;q=0.6"
    }

  response = requests.get(amazon_link, headers=header)
  soup = BeautifulSoup(response.text, "lxml")

  img = soup.select_one('#imgTagWrapperId img')['src']
  link = soup.select_one('link[rel=canonical]')['href']

  center_col = soup.select_one('div#centerCol')
  product_id = link.split('/')[-1]
  title = center_col.select_one('span#productTitle').text.strip()
  rating = center_col.select_one('span.a-icon-alt').text.split(' ')[0]
  price_in_str = center_col.select_one('span.a-price.apexPriceToPay > span').text
  price = price_in_str[1:]
  # numReviews = center_col.select_one('span#acrCustomerReviewText').text.split(' ')[0]

  data = {}
  data['product_id'] = product_id
  data['title'] = title
  data['price'] = float(price)
  data['rating'] = float(rating)
  data['image'] = img
  data['link'] = link
  data['source'] = 'amazon'

  print(json.dumps(data))

def etsy_single(etsy_link):
  etsy_page = requests.get(etsy_link, headers=header).text
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

  price = price.split('$')[1]
  if(price[-1] == '+'):
    price = price[0:-1]
  else:
    price = price[0:]

  data = {}
  data['product_id'] = listing_id
  data['title'] = title
  data['price'] = '%.2f' % float(price)
  data['num_sales'] = (numSales.split(' ')[0].replace(',',''))
  data['rating'] = float(ratings)
  data['image'] = first_img
  data['link'] = etsy_link
  data['source'] = 'etsy'

  print(json.dumps(data))

def google_scrape(google_link):

  res = requests.get(google_link,  headers=header).text
  s = BeautifulSoup(res, 'lxml')

  product_id = re.search('\d+', google_link).group()
  title = s.select_one('div.LDQll span').getText()
  img = s.select_one('.sh-div__image')['src']
  rating = s.select_one('.uYNZm').getText()
  price_div = s.select_one('div.sh-pricebar__details-section')
  price = price_div.select_one('div.FYiaub').getText().split(' ')[0].replace('$', '')
  source = price_div.select_one('span').getText()
  link = f"https://www.google.com{price_div.select_one('.D4MQ1')['href']}"

  data = {}
  data['product_id'] = product_id
  data['title'] = title
  data['price'] = float(price)
  data['rating'] = float(rating)
  data['image'] = img
  data['link'] = link
  data['source'] = source

  print(json.dumps(data))


if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Fetch single product from etsy or google shopping')
  parser.add_argument('links', nargs='+',help='Amazon, Etsy, or Google Shopping product link')
  # parser.add_argument('-o','--output', nargs='?', help='output file link')
  # parser.add_argument('-s', '--source', nargs='?', help='source of link (google or etsy')
  args = parser.parse_args()
  for link in args.links:
    if('etsy.com/listing' in link):
      etsy_single(link)
      # print('etsy link here')
    elif ('google.com/shopping/product' in link):
      # print('google link')
      google_scrape(link)
    elif ('amazon.com' in link):
      amazon_scrape(link)
    else:
      print('invalid link')
