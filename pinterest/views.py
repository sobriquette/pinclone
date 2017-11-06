from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Pin

def index(request):
	context = {'pins_list': Pin.objects.all()}
	return render(request, 'pinterest/index.html', context)
