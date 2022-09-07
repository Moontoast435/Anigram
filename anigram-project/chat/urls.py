from django.urls import path
from . import views


urlpatterns = [
    path('clients/', views.get_clients, name="chats-clients"),
    path('reset/', views.reset_clients, name="chats-reset-clients"),
    path('populate/', views.populate_chats, name="chats-reset-clients"),
    path('', views.get_chats, name="chats-index"),
]
