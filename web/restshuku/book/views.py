from book.models import Book, Borrowrel
from rest_framework import viewsets
from book.serializers import BookSerializer, BorrowrelSerializer


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BorrowrelViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Borrowrel.objects.all()
    serializer_class = BorrowrelSerializer