import json

class Pinner:
	def __init__(self, **kwargs):
		self.allowed_keys = {			
			'pinner_id',
			'avatar',
			'full_name',
			'username'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)
		self.boards = {}

	def add_board(self, board_id, board):
		if board_id not in self.boards:
			self.boards[board_id] = board

class Pin:
	def __init__(self, **kwargs):
		self.allowed_keys = {
			'pin_id',
			'board',
			'description',
			'like_count',
			'link',
			'title'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)

class Board:
	def __init__(self, **kwargs):
		self.allowed_keys = {
			'board_id',
			'name',
			'pinner',
			'url'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)
		self.pins = {}

	def add_pin(self, pin_id, pin):
		if pin_id not in self.pins:
			self.pins[pin_id] = pin

class Image:
	def __init__(self, image_id, pin, url=None):
		self.image_id = image_id
		self.pin = pin
		self.url = url

def print_collection(obj):
	ignored_attr = {'allowed_keys'}
	# iterate through dictionary of Pinner objects
	for k, v in obj.items():
		print(v)
		attrs = vars(v)
		# get all attributes of current Pinner object
		for attr, val in attrs.items():
			if '__' not in attr or attr not in ignored_attr:
				if attr == 'boards':
					print_collection(val)
				print("{}: {}".format(attr, val))
		print("\n")

def write_fixtures(obj, model_name):
	file_ext = '.json'
	filename = model_name + 's'

	with open(filename + file_ext, 'w') as f:
		f.write('[ \n')

		for obj, data in obj.items():
			tmp = dict(data.__dict__)
			ignored_attr = {'allowed_keys', 'boards', 'pins'}

			for e in ignored_attr:
				if e in tmp:
					del tmp[e]

			f.write('\t{\n' + \
						'\t\t"model": "pinterest.{}",\n'.format(model_name) + \
					 	'\t\t"pk": {},\n'.format(obj) + \
					 	'\t\t"fields": {}\n'.format(json.JSONEncoder(indent=8).encode(tmp)) + \
					'\t},\n')

		f.write(']')

if __name__ == "__main__":
	pins = {}
	pinners = {}
	boards = {}
	images = {}

	with open('pins_formatted.json') as json_file:
		data = json.load(json_file)

		for item in data:
			pinner_data = item['pinner']
			images_data = item['images']
			board_data = item['board']

			# making a Pin
			if item['id'] not in pins:
				curr_pin = Pin(
					pin_id=item['id'],
					board=board_data['id'],
					description=item['description_html'],
					like_count=item['like_count'],
					link=item['link'],
					title=item['title']
				)
				pins[curr_pin.pin_id] = curr_pin
			else:
				curr_pin = pins[item['id']]

			# making a Pinner
			if pinner_data['id'] not in pinners:
				curr_pinner = Pinner(
					pinner_id=pinner_data['id'],
					avatar=pinner_data['image_small_url'],
					full_name=pinner_data['full_name'],
					username=pinner_data['username']
				)

				pinners[curr_pinner.pinner_id] = curr_pinner
			else:
				curr_pinner = pinners[pinner_data['id']]

			# making Board
			if board_data['id'] not in boards:
				curr_board = Board(
					board_id=board_data['id'],
					name=board_data['name'],
					pinner=board_data['owner'],
					url=board_data['url']
				)

				boards[curr_board.board_id] = curr_board
			else:
				curr_board = boards[board_data['id']]

			if images_data['orig']['url'] not in images:
				curr_image = Image(
					tem['image_signature'], 
					item['id'], 
					images_data['orig']['url']
				)
				images[curr_image.image_id] = curr_image


			curr_board.add_pin(curr_pin.pin_id, curr_pin)
			curr_pinner.add_board(curr_board.board_id, curr_board)


	# create files for fixtures to import into Django DB
	write_fixtures(pinners, 'pinner')
	write_fixtures(boards, 'board')
	write_fixtures(pins, 'pin')
	write_fixtures(images, 'image')
	# print_collection(pinners)













