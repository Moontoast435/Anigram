from django.urls import path
from . import views

urlpatterns = [
    path('api/post', views.PostListCreate.as_view() ),
    path('api/login/', views.login_view, name='api-login'),
    path('api/logout/', views.logout_view, name='api-logout'),
    path('api/session/', views.session_view, name='api-session'),
    path('api/whoami/', views.whoami_view, name='api-whoami'),
]
