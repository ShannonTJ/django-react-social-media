from django.test import TestCase

# Create your tests here.
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="abc", password="somepassword")
        self.user2 = User.objects.create_user(
            username="abc2", password="somepassword2")

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
