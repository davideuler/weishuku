from django.conf.urls import patterns, url

from tag import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^taglist/$', views.tag_list, name='taglist'),
)
