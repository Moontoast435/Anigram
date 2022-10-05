from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
# Create your views here.

def index(request):
    return render(request, 'index.html')

# def index(request):
#     path = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')
#     print(path)
#     if os.path.isfile(path):
#         with open(path, 'rb') as file:
#             return HttpResponse(file.read(), content_type='application/javascript')
#     else:
#         return HttpResponseNotFound()
