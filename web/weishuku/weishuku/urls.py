from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'weishuku.views.home', name='home'),
    # url(r'^weishuku/', include('weishuku.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^$', include('default.urls', namespace='default')),
    url(r'^book/', include('book.urls', namespace='book')),
    url(r'^tag/', include('tag.urls', namespace='tag')),
    url(r'^member/', include('member.urls', namespace='member')),
    url(r'^admin/', include(admin.site.urls)),
)
