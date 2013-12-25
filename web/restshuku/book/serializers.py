from book.models import Book, Borrowrel
from rest_framework import serializers


class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('id','url', 'title', 'summary', 'price')


class BorrowrelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Borrowrel
        fields = ('url', 'bookid', 'owner', 'borrower')