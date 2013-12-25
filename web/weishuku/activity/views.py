from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django import forms
from django.conf import settings
import json
import datetime
import json
import urllib2


def index(request):
    return render(request, 'activity/index.html')
