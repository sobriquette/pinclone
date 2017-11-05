import uuid
from django.db import models
import django.utils.encoding

class Pinner(models.Model):
	pinner_id = models.CharField(primary_key=True, editable=False, max_length=255)
	avatar = models.URLField(blank=True)
	board = models.ForeignKey(Board, on_delete=models.CASCADE)
	full_name = models.CharField(max_length=128)
	username = models.CharField(max_length=20)

	def print_attr(self):
		for k, v in self.__dict__.items():
			if '__' not in k:
				print("{}: {}".format(k, v))

	def __str__(self):
		return self.username


class Board(models.Model):
	board_id = models.CharField(primary_key=True, editable=False, max_length=255)
	name = models.CharField(max_length=20)
	pin = models.ForeignKey(Pin, on_delete=models.CASCADE)
	url = models.URLField()

	def print_attr(self):
		for k, v in self.__dict__.items():
			if '__' not in k:
				print("{}: {}".format(k, v))

	def __str__(self):
		return self.name

class Pin(models.Model):
	pin_id = models.CharField(primary_key=True, editable=False, max_length=255)
	description = models.CharField(max_length=255, blank=True)
	image = models.ForeignKey(Image, on_delete=models.CASCADE)
	like_count = models.IntegerField(blank=True)
	link = models.URLField(blank=True, null=True)
	title = models.CharField(max_length=128, blank=True)
	
	def print_attr(self):
		for k, v in self.__dict__.items():
			if '__' not in k:
				print("{}: {}".format(k, v))

	def __str__(self):
		return self.title

class Image(models.Model):
	image_id = models.CharField(primary_key=True, editable=False, max_length=255)
	url = models.URLField(blank=True, null=True)

	def print_attr(self):
		for k, v in self.__dict__.items():
			if '__' not in k:
				print("{}: {}".format(k, v))

	def __str__(self):
		return self.url