'''
    Python Scraper to scraper data

'''
import sys
import argparse
import requests
from bs4 import BeautifulSoup


class Scraper:
    '''
        Constructor
    '''

    def __init__(self, url, file) -> None:
        self.source_url = url
        self.headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'User-Agent': '''Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0)
                                Gecko/20100101 Firefox/52.0'''
        }
        self.file = file
        self.get_raw_html()
        self.filter()
    '''
        Get Raw html data
    '''

    def filter(self):
        # test = self.soup.find_all(lambda tag: tag.name == 'table' and tag.get('class') == ['product'])
        # test = self.soup.find("table" , {"cellpadding" : "0",  "cellspacing" : "0"})
        # table = self.soup.findAll(lambda tag: tag.name=='table' and tag.has_attr('cellpadding') and tag['cellpadding']=="0" and tag.has_attr('cellspacing') and tag['cellspacing']=="0") 
        table = self.soup.findAll('td', {"colspan" : "3", "width" : "100%"})
        # children = table.findChildren("table" , recursive=True)

        # t = test.findChildren('img')
        print(table)


    def get_raw_html(self):
        if self.file:
            with open(self.file, 'r', encoding='utf-8') as file:
                self.soup = BeautifulSoup(file.read(), 'html.parser')
        elif self.source_url:
            data = requests.get(self.source_url, self.headers)
            self.soup = BeautifulSoup(data.content, 'html.parser')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='SENG3011 WebScraper')
    parser.add_argument('--file', metavar='f', help='HTML file for scraping')
    parser.add_argument('--url', metavar='u', help='URL to scrape')
    args = parser.parse_args()
    if not args.file and not args.url:
        parser.print_help()
        sys.exit(1)
    scraper = Scraper(args.url, args.file)
