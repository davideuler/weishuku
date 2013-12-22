# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render, redirect
from django.views.decorators.cache import cache_page
from django import forms
from django.conf import settings
import json
import datetime
from book.models import Book
from book.forms import BookForm
from url_tool import parse_book_by_url
from url_tool import parse_book_by_id
import datetime
from django.contrib.auth.decorators import login_required

def index(request):
    return HttpResponse(json.dumps('hello world!'), content_type="application/json")

@cache_page(60 * 60 * 24)
def book_list(request):
    is_login = request.user.is_authenticated()
    q = Book.objects.all()
    book_list = [(item.title,item.isbn) for item in q]
    return HttpResponse(json.dumps(book_list), content_type="application/json")

@login_required
def library(request):
    context = dict()
    q = Book.objects.filter(ownerid=request.user.id)
    book_list = [item for item in q]
    context['book_list'] = book_list
    context['is_login'] = request.user.is_authenticated()
    context['username'] = request.user.username
    context['book_num'] = len(book_list)
    return render(request, 'book/library.html', context)

@login_required
def add_book(request):
    context = dict()
    if request.method == 'POST':
        if 'url' in request.POST:
            url = request.POST['url']    
            context = parse_book_by_url(url)
            return render(request, 'book/add.html', context)
        if 'bookid' in request.POST:
            bookid = request.POST['bookid']
            context = parse_book_by_id(bookid)
            book = Book()
            book.title = context['title']
            book.publisher = context['publisher']
            book.isbn = context['isbn10'] if 'isbn10' in context else context['isbn13']
            book.url = context['url']
            book.ispersonal = int(True)
            book.ownerid = request.user.id
            book.summary = context['summary']
            book.price = context['price']
            book.numraters = 0
            book.averageRate = 3
            book.created_date = datetime.datetime.now()
            book.updated_date = datetime.datetime.now()
            book.author = context['author'][0]
            book.pubdate = context['pubdate']
            book.ispublic = int(True)
            book.imgurl = context['images']
            book.save()
            return redirect('/book/library', context)
    else:    
        form = BookForm()
        context['form'] = form
        return render(request, 'book/add.html', context)

def info_book(request, id):
    context = dict()
    context['is_login'] = request.user.is_authenticated()
    if request.user.is_authenticated():
        context['username'] = request.user.username
    q = Book.objects.filter(id=id)
    context['book'] = q[0]
    context['tags'] = []
    return render(request, 'book/detail.html', context)

@login_required
def del_book(request):
    pass
    
@login_required
def update_book(request):
    pass
