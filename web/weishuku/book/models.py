from django.db import models

class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=105L)
    publisher = models.CharField(max_length=45L, blank=True)
    isbn = models.CharField(max_length=45L)
    url = models.CharField(max_length=45L, blank=True)
    ispersonal = models.CharField(max_length=45L, db_column='isPersonal') # Field name made lowercase.
    ownerid = models.CharField(max_length=45L)
    summary = models.CharField(max_length=45L, blank=True)
    price = models.CharField(max_length=45L, blank=True)
    numraters = models.CharField(max_length=45L, db_column='numRaters', blank=True) # Field name made lowercase.
    averagerate = models.CharField(max_length=45L, db_column='averageRate', blank=True) # Field name made lowercase.
    created_date = models.DateTimeField(null=True, blank=True)
    updated_date = models.DateTimeField(null=True, blank=True)
    borrowdate = models.DateTimeField(null=True, blank=True)
    author = models.CharField(max_length=45L, blank=True)
    pubdate = models.CharField(max_length=45L, blank=True)
    ispublic = models.CharField(max_length=45L, db_column='isPublic', blank=True) # Field name made lowercase.
    class Meta:
        db_table = 'Book'

    def __unicode__(self):
        return self.title
