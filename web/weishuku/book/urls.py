from django.conf.urls import patterns, url
from book import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^booklist/$', views.book_list, name='booklist'),
    url(r'^library/$', views.library, name='library'),
    url(r'^addbook/$', views.add_book, name='addbook'),
    url(r'^(?P<id>\d+)/$', views.info_book, name='info_book'),
    url(r'^borrow/$', views.borrow_book, name='borrow_book'),
    #url(r'^algo_list/(?P<business>\d{1})/(?P<fromdate>\d{4}\-\d{2}\-\d{2})/(?P<todate>\d{4}\-\d{2}\-\d{2})/$', views.algo_list, name='algo_list'),
)
