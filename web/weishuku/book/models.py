from django.db import models

class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=128L)
    publisher = models.CharField(max_length=128L, blank=True)
    isbn = models.CharField(max_length=13L)
    url = models.CharField(max_length=128L, blank=True)
    ispersonal = models.IntegerField(db_column='isPersonal') # Field name made lowercase.
    ownerid = models.IntegerField()
    summary = models.CharField(max_length=1024L, blank=True)
    price = models.FloatField(null=True, blank=True)
    numraters = models.CharField(max_length=45L, db_column='numRaters', blank=True) # Field name made lowercase.
    averagerate = models.IntegerField(null=True, db_column='averageRate', blank=True) # Field name made lowercase.
    created_date = models.DateTimeField(null=True, blank=True)
    updated_date = models.DateTimeField(null=True, blank=True)
    borrowdate = models.DateTimeField(null=True, blank=True)
    author = models.CharField(max_length=128L, blank=True)
    pubdate = models.CharField(max_length=45L, blank=True)
    ispublic = models.IntegerField(null=True, db_column='isPublic', blank=True) # Field name made lowercase.
    imgurl = models.CharField(max_length=128L, db_column='ImgURL', blank=True) # Field name made lowercase.
    class Meta:
        db_table = 'Book'

    def __unicode__(self):
        return self.title


