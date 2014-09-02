from django.template import Context, loader
from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse
from posts.models import Post
import json


def public(request):
    return render_to_response('index.html')


def index(request):
    posts = Post.objects.order_by('-create_date')
    response = {
        'Success': True,
        'Data': [post.to_dict_snippet() for post in posts]
    }

    return HttpResponse(json.dumps(response), content_type="application/json")


def detail(request, post_id):

    # Getting details of a post
    if request.method == 'GET':
        try:
            response = {
                'Success': True,
                'Data': Post.objects.get(pk=post_id).to_dict()
            }

        except Post.DoesNotExist:
            response = {
                'Success': False,
                'Message': 'Post does not exist'
            }

        return HttpResponse(json.dumps(response), content_type="application/json")

    # Deleting a post
    else:
        p = Post.objects.get(pk=post_id)
        p.delete()

        response = { 'Success': True }

        return HttpResponse(json.dumps(response), content_type="application/json")


def create(request):

    print('create')
    return HttpResponse(json.dumps('response'), content_type="application/json")
