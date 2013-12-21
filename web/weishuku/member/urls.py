from django.conf.urls import patterns, url

from member import views

urlpatterns = patterns('',
    url(r'^login/$', views.my_login, name='login'),
    url(r'^register/$', views.register, name='register'),
)
