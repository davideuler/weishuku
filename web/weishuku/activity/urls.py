from django.conf.urls import patterns, url

from activity import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
