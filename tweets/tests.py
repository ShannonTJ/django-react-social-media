from django.test import TestCase
from django.contrib.auth import get_user_model

from .models import Tweet

User = get_user_model()


# Create your tests here.
class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="abc", password="somepassword")

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="my tweet", user=self.user)
        self.assertEqual(tweet_obj.id, 1)
        self.assertEqual(tweet_obj.user, self.user)
