from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django import forms
from django.conf import settings
import json
import datetime
from book.models import Book
import json
import urllib2


def index(request):
    return HttpResponse(json.dumps('hello world!'), content_type="application/json")

@cache_page(60 * 60 * 24)
def tag_list(request):
    data = json.load(urllib2.urlopen('http://192.168.8.103:27080/weishuku/booktag/_find'))
    return HttpResponse(json.dumps(data), content_type="application/json")