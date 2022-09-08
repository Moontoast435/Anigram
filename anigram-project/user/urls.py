from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView, ShowUserProfileView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()), 
    path('user/<str:username>', ShowUserProfileView, name="chats-index"),

    # path('show/<str:pk>', views.getPost, name='post')
]
