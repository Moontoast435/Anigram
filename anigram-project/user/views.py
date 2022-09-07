from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.http import JsonResponse
import json 
class GetUserProfileView(APIView):
    def get(self, username, format=None):
        try:
            user = self.request.user
            
            username = user.username
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile' : user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Something went wrong when retrieving profile'})

           
class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']
            status = data['status']
            
            UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city, status=status)

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({ 'error': 'Something went wrong when updating profile' })

# class ShowUserProfileView(APIView):
#     def get(self, pk, format=None):
#         try:
#             user = UserProfile.objects.get(id=pk)

def ShowUserProfileView(request, username):
    user = list(User.objects.filter(username = username))[0]
    chosenUser = list(UserProfile.objects.filter(user = user).values())[0]
    return JsonResponse({ 'username': json.dumps(chosenUser) })
