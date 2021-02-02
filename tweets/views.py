import random
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse

from .forms import TweetForm
from .models import Tweet

# Create your views here.


def home_view(request, *args, **kwargs):
    # return HttpResponse("<h1>Hello world</h1>")
    return render(request, "pages/home.html", context={}, status=200)


def tweet_create_view(request, *args, **kwargs):
    # initialize with data or none
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None

    # save the form if valid
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form-related logic
        obj.save()
        if next_url != None:
            return redirect(next_url)
        # re-initialize new blank form
        form = TweetForm()
    return render(request, "components/form.html", context={"form": form})


def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JS or Swift or Java or ios/Android
    return json data
    """
    # qs = query set
    qs = Tweet.objects.all()
    tweets_list = [{
        "id": x.id,
        "content": x.content,
        "likes": random.randint(65, 75)} for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list}
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consume by JS or Swift or Java or ios/Android
    return json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = 'Not found'
        status = 404

    return JsonResponse(data, status=status)
