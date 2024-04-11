from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Boiler Plate Test")

# Create your views here.
