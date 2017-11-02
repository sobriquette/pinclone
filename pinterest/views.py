from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return HttpResponse("Hello, world. you're at the index page.")

# Create your views here.
