from django.shortcuts import render
from django.http import HttpResponse
from .models import Pin

def index(request):
	all_pins_list = {}
	pin_attrs = ['description', 'link', 'title', 'image']
	
	for pin in Pin.objects.all().select_related('image'):
		all_pins_list[pin.pin_id] = {}
		image = pin.image

		for attr in pin_attrs:
			if attr == 'image':
				all_pins_list[pin.pin_id][attr] = image.url
			else:
				all_pins_list[pin.pin_id][attr] = pin.attr

	return HttpResponse(all_pins_list)
