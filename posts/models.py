from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.CharField(max_length=255)
    create_date = models.DateTimeField('date published')

    def __unicode__(self):
        return self.title

    def to_dict_snippet(self):
        content_snippet = (self.content[:160] + '..') if len(self.content) > 160 else self.content

        return {
            'id': self.id,
            'title': self.title,
            'content': content_snippet,
            'author': self.author,
            'created': self.create_date.isoformat()
        }

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.author,
            'created': self.create_date.isoformat()
        }
