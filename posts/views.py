from django.template import Context, loader
from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse
from django.utils import timezone
from posts.models import Post
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def public(request):
    return render_to_response('index.html')


@csrf_exempt
def index(request):
    # Getting all the posts
    if request.method == 'GET':
        posts = Post.objects.order_by('-create_date')
        response = {
            'Success': True,
            'Data': [post.to_dict_snippet() for post in posts]
        }

        return HttpResponse(json.dumps(response), content_type="application/json")

    else:
        p = Post(title = request.POST['title'], content = request.POST['content'],
            author = request.POST['author'], create_date=timezone.now())
        p.save()

        response = {
            'Success': True,
            'Data': p.id
        }

        return HttpResponse(json.dumps(response), content_type="application/json")


@csrf_exempt
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
