'''
    Python Scraper to scraper data

'''
import sys
import argparse
import requests
from bs4 import BeautifulSoup
import json
import re


class Scraper:
    '''
        Constructor
    '''

    def __init__(self) -> None:
        self.headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'User-Agent': '''Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0)
                                Gecko/20100101 Firefox/52.0'''
        }
        self.source_url = None
        self.file = "index.html"
        # self.file = None
        self.get_raw_html()
        self.filter()

    def curl_data(self, link):
        try:
            try:
                data = requests.get(link, self.headers)
            except Exception:
                return None
            test = BeautifulSoup(data.content, 'html.parser')
            info = test.findAll('td', {"class" : "tdline"})
            desc = test.findAll('td', {"valign" : "top"})
            country = ""
            lat = ""
            lon = ""
            try:
                country = info[5].text.rstrip()
                lat = info[9].text.rstrip()
                lon = info[11].text.rstrip()
            except Exception:
                pass
            url = None
            try:
                url = info[13].find('a', href=True)["href"]
            except Exception:
                pass

            new = BeautifulSoup(desc[3].text, 'html.parser')
            if not new:
                return
            strongs = new.findAll('strong')
            total = len(strongs)
            reports = []
            if total == 0:
                sub_reports = new.text.split("\n")
                for child in sub_reports:
                    if child == "Read the full article:" or "Read Full Article At" in child:
                        break
                    reports.append(child)
            else:
                for child in strongs:
                    text = child.text
                    if text == "Read the full article:" or "Read Full Article At" in text:
                        break
                    reports.append(text)
            data = {"country" : country, "latitude" : lat, "longitude" : lon, "reports" : reports, "link" : url}
            return data
        except Exception:
            return None
    '''
        Get Raw html data
    '''
    def filter(self):
        rows = self.soup.findAll('tr', {"nowrap" : "nowrap"})
        for information in rows:
            try:
                children = information.findAll('td')
                name = children[0].string
                links = []
                link = None
                try:
                    link = children[1].find('a', href=True)["href"]
                except Exception:
                    pass

                more_info = None
                if link:
                    links.append(link)
                    more_info = self.curl_data(link)
                time = ""
                region = ""
                city = ""
                description = ""
                try:
                    time = children[2].string
                    region = children[3].string
                    city = children[4].string
                    description = children[5].div.text.lstrip()
                except Exception:
                    pass
                country = ""
                lat = ""
                lon = ""
                reports = []
                if more_info:
                    country = more_info["country"]
                    lat = more_info["latitude"]
                    lon = more_info["longitude"]
                    reports = more_info["reports"]
                    if more_info["link"]:
                        links.append(more_info["link"])
                
                data = {
                    "name" : name, 
                    "links" : links, 
                    "time" : time, 
                    "region code" : region, 
                    "city" : city,
                    "country" : country,
                    "description" : description,
                    "latitude" : lat,
                    "longitude" : lon,
                    "reports" : reports
                }
                jsonStr = json.dumps(data)
                print(jsonStr)
            except Exception:
                pass


    def get_raw_html(self):
        if self.file:
            with open(self.file, 'r') as file:
                self.soup = BeautifulSoup(file.read(), 'html.parser')
        elif self.source_url:
            data = requests.get(self.source_url, self.headers)
            self.soup = BeautifulSoup(data.content, 'html.parser')
            print(self.soup.prettify())


if __name__ == '__main__':
    # parser = argparse.ArgumentParser(description='SENG3011 WebScraper')
    # parser.add_argument('--file', metavar='f', help='HTML file for scraping')
    # parser.add_argument('--url', metavar='u', help='URL to scrape')
    # args = parser.parse_args()
    # if not args.file and not args.url:
    #     parser.print_help()
    #     sys.exit(1)
    scraper = Scraper()
