from django.contrib import admin
from book.models import Book


class BookAdmin(admin.ModelAdmin):
    fields = ['title', 'publisher', 'isbn', 'url', 'ispersonal', 'ownerid', 'summary', 'price', 'numraters', 
        'averagerate', 'created_date', 'updated_date', 'borrowdate', 'author', 'pubdate', 'ispublic']

admin.site.register(Book, BookAdmin)