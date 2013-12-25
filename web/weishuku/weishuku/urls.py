from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', include('default.urls', namespace='default')),
    url(r'^book/', include('book.urls', namespace='book')),
    url(r'^tag/', include('tag.urls', namespace='tag')),
    url(r'^member/', include('member.urls', namespace='member')),
    url(r'^message/', include('message.urls', namespace='message')),
    url(r'^activity/', include('activity.urls', namespace='activity')),
    url(r'^admin/', include(admin.site.urls)),
)
