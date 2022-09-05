from django.shortcuts import render
from django.http import JsonResponse
from .models import Clients, Chats

# Create your views here.
def get_chats(request):
    #SQL request for each chat where user is either sender or recipient
    chats = list(Chats.objects.values())
    return JsonResponse({"message" : chats})

def get_clients(request):
    clients = list(Clients.objects.values())
    return JsonResponse({"message" : clients})

def reset_clients(request):
    Clients.objects.all().delete()
    return JsonResponse({"message" : "Success"})
