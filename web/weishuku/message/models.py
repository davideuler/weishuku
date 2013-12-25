from django.db import models

class Message(models.Model):
    id = models.AutoField(primary_key=True, db_column='Id') # Field name made lowercase.
    originid = models.IntegerField(db_column='OriginID') # Field name made lowercase.
    targetid = models.IntegerField(db_column='TargetID') # Field name made lowercase.
    status = models.IntegerField(db_column='Status') # Field name made lowercase.
    createdate = models.DateTimeField(db_column='CreateDate') # Field name made lowercase.
    content = models.CharField(max_length=256L, db_column='Content') # Field name made lowercase.
    handler = models.CharField(max_length=256L, db_column='Handler') # Field name made lowercase.
    class Meta:
        db_table = 'Message'