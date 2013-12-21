from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django import forms
from django.conf import settings
import json
import datetime
from book.models import Book


def index(request):
    return HttpResponse(json.dumps('hello world!'), content_type="application/json")

@cache_page(60 * 60 * 24)
def book_list(request):
    q = Book.objects.all()
    book_list = [(item.title,item.isbn) for item in q]
    return HttpResponse(json.dumps(book_list), content_type="application/json")

def my_library(request):

    pass

def add_book(request):
    pass

def del_book(request):
    pass

def update_book(request):
    pass
