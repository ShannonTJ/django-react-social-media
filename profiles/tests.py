from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

from .models import Profile

User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="abc", password="somepassword")
        self.user2 = User.objects.create_user(
            username="abc2", password="somepassword2")

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="somepassword")
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.user2
        # added a follower
        first.profile.followers.add(second)
        second_user_following_who = second.following.all()
        # from a user, check the other user is being followed
        qs = second_user_following_who.filter(user=first)
        self.assertTrue(qs.exists())
        # check new user is not following anyone
        first_user_following_none = first.following.all()
        self.assertFalse(first_user_following_none.exists())

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.user2.username}/follow/",
            {"action": "follow"}
        )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        first = self.user
        second = self.user2
        first.profile.followers.add(second)
        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.user2.username}/follow/",
            {"action": "unfollow"}
        )
        r_data = response.json()
        count = r_data.get("count")
        self.assertEqual(count, 0)
