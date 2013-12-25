# -*- coding: utf-8 -*-
import json
import urllib2
import re

NUM_PATTERN = re.compile('\d+\.\d+')

def parse_book_by_url(douban_url):
    #http://book.douban.com/subject/6828611/
    arr = douban_url.strip().split('/')
    bookid = None
    for i in reversed(range(1, len(arr))):
        if arr[i] != '/' and arr[i] != '':
            bookid = arr[i]
            break
    return parse_book_by_id(bookid)

def parse_book_by_id(bookid):
    base_url = 'https://api.douban.com/v2/book/'
    target_url = '%s%s' % (base_url,bookid)
    data = json.load(urllib2.urlopen(target_url))
    context = dict()
    context['hasbook'] = True
    context['bookid'] = data['id']
    context['author'] = data['author']
    context['pubdate'] = data['pubdate']
    context['pages'] = data['pages']
    context['url'] = data['url']
    context['publisher'] = data['publisher']
    context['title'] = data['title']
    if 'isbn10' in data:
        context['isbn10'] = data['isbn10']
    if 'isbn13' in data:
        context['isbn13'] = data['isbn13']
    context['images'] = data['images']['large']
    context['summary'] = data['summary']
    context['price'] = parse_price(data['price'])
    context['author_intro'] = data['author_intro']
    tag_list = [item['name'] for item in data['tags']]
    context['tags'] = tag_list
    context['catalog'] = data['catalog']
    return context

def parse_price(price_str):
    obj = NUM_PATTERN.match(price_str)
    if obj != None:
        return float(obj.group(0))
    return 0    

if __name__ == '__main__':
    parse_book_by_url('http://book.douban.com/subject/6828611/')
    parse_book_by_url('http://book.douban.com/subject/6828611')
    parse_book_by_id('6828611')

    price_str = '34543.09sdfawsdf'
    print parse_price(price_str)



