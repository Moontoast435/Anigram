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

chats = [
    {"sender" : "mattr", "recipient": "seanm" , "message" : "hey" , "date" : "2022-09-06 18:35:34.442490"},
    {"sender" : "mattr", "recipient": "seanm" , "message" : "hello!" , "date" : "2022-09-06 19:35:34.442490"},
    {"sender" : "seanm", "recipient": "mattr" , "message" : "hey" , "date" : "2022-09-06 19:36:34.442490"},
    {"sender" : "seanm", "recipient": "mattr" , "message" : "I like Django" , "date" : "2022-09-06 19:40:34.442490"},
    {"sender" : "mattr", "recipient": "seanm" , "message" : "How do I unfriend in this app" , "date" : "2022-09-06 20:35:34.442490"},

]
def populate_chats(request):
    for obj in chats:
        print(obj)
        Chats.objects.create(sender=obj['sender'], recipient=obj["recipient"], message=obj["message"], date=obj["date"])
    return JsonResponse({"message" : "Successfully populated"})
