from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Image, Pin

def index(request):
	# all_imgs_list = {}
	
	# for img in Image.objects.all().select_related('pin'):
	# 	all_imgs_list[img.image_id] = {}
	# 	pin = img.pin

	# 	all_imgs_list[img.image_id]['url'] = img.url
	# 	all_imgs_list[img.image_id]['pin'] = {}

	# 	# TODO: Refactor so we don't have to list these individually
	# 	all_imgs_list[img.image_id]['pin']['description'] = pin.description
	# 	all_imgs_list[img.image_id]['pin']['like_count'] = pin.like_count
	# 	all_imgs_list[img.image_id]['pin']['link'] = pin.link
	# 	all_imgs_list[img.image_id]['pin']['title'] = pin.title

	pins = Pin.objects.all()
	template = loader.get_template('pinterest/index.html')
	context = {
		'pins_list': pins,
	}

	return HttpResponse(template.render(context, request))
