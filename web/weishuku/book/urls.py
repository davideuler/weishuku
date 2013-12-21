from django.conf.urls import patterns, url

from book import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^booklist/$', views.book_list, name='booklist'),
    #url(r'^algo_list/(?P<business>\d{1})/(?P<fromdate>\d{4}\-\d{2}\-\d{2})/(?P<todate>\d{4}\-\d{2}\-\d{2})/$', views.algo_list, name='algo_list'),
)
