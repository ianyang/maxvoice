from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('posts.views',
    # User facing routes
    url(r'^$', 'public'),
    url(r'^\d', 'public'),
    url(r'^create$', 'public'),

    # API routes
    url(r'^api/posts$', 'index'),
    url(r'^api/posts/(?P<post_id>\d+)$', 'detail'),
)

urlpatterns += patterns('',
    url(r'^admin', include(admin.site.urls)),
)
