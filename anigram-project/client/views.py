from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
# Create your views here.

def index(request):
    return render(request, 'index.html')

