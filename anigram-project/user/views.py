from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.http import JsonResponse
import json 
class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user

            username = user.username
            
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)
            
            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:

            return Response({'error': 'Something went wrong when retrieving profile'})


           
class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            pet_name = data['pet_name']
            owner_name = data['owner_name']
            phone = data['phone']
            city = data['city']
            status = data['status']
            adoptable = data['adoptable']
            credentials = data['credentials']
            
            if adoptable == True:
                 UserProfile.objects.filter(user=user).update(adoptable=True)
            elif adoptable == False:
                 UserProfile.objects.filter(user=user).update(adoptable=False)
                 
            UserProfile.objects.filter(user=user).update(pet_name=pet_name, owner_name=owner_name, phone=phone, city=city, status=status, credentials=credentials)

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
    return JsonResponse({ 'profile': json.dumps(chosenUser), 'username' : username })

