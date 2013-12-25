from django.db import models

class Booktag(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id') # Field name made lowercase.
    bookid = models.IntegerField(db_column='BookID') # Field name made lowercase.
    tagid = models.IntegerField(db_column='TagID') # Field name made lowercase.
    class Meta:
        db_table = 'BookTag'

class Tag(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id') # Field name made lowercase.
    createdate = models.DateTimeField(db_column='CreateDate') # Field name made lowercase.
    value = models.CharField(max_length=256L, db_column='Value') # Field name made lowercase.
    class Meta:
        db_table = 'Tag'