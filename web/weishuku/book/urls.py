from django.conf.urls import patterns, url
from book import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^booklist/$', views.book_list, name='booklist'),
    url(r'^library/$', views.library, name='library'),
    url(r'^addbook/$', views.add_book, name='addbook'),
    url(r'^(?P<id>\d+)/$', views.info_book, name='info_book'),
    url(r'^borrow/$', views.borrow_book, name='borrow_book'),
    url(r'^return/(?P<id>\d+)/$', views.return_book, name='return_book'),
)
