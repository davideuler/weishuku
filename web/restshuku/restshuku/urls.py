from django.conf.urls import patterns, url, include
from rest_framework import routers
from member.views import UserViewSet, GroupViewSet
from book.views import BookViewSet, BorrowrelViewSet

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'rels', BorrowrelViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)