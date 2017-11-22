from django.conf.urls import url
from . import views

urlpatterns = [
	# ex: /pinterest/
	url(r'^$', views.index, name='index')
]