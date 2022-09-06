from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update',(UpdateUserProfileView.as_view()))
]