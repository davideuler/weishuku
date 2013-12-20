from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
import json
import urllib2

def index(request):
    context = dict()
    tag_data = json.load(urllib2.urlopen('http://192.168.8.103:27080/weishuku/booktag/_find'))
    tag_list = list()
    for item in tag_data['results']:
        tag_list.append(item['name'])
    print tag_list
    context['tag_list'] = tag_list
    return render(request, 'default/home.html', context)

