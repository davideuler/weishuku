# -*- coding: utf-8 -*-
from django import forms

class BookForm(forms.Form):
    title = forms.CharField(max_length=100)
    publisher = forms.CharField(max_length=100)
    isbn = forms.BooleanField(required=False)
    url = forms.CharField(max_length=100)
    summary = forms.CharField(max_length=100)
    price = forms.CharField(max_length=100)
    numraters = forms.CharField(max_length=100)
    averagerate = forms.CharField(max_length=100)
    #created_date = forms.CharField(max_length=100)
    #updated_date = forms.CharField(max_length=100)
    #borrowdate = forms.CharField(max_length=100)
    author = forms.CharField(max_length=100)
    pubdate = forms.CharField(max_length=100)
    ispublic = forms.CharField(max_length=100)
    ispersonal = forms.CharField(max_length=100)
