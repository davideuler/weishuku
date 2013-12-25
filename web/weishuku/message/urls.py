from django.conf.urls import patterns, url

from message import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^msgnum$', views.msg_num, name='msg_num'),
    url(r'^msgnum$', views.msg_num, name='msg_num'),
    url(r'^handle_msg/(?P<id>\d+)/$', views.handle_msg, name='handle_msg'),
)
