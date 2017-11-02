import json

class Pinner:
	def __init__(self, **kwargs):
		self.allowed_keys = {			
			'id_',
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
			'id_',
			'description',
			'images',
			'like_count',
			'link',
			'title'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)

class Board:
	def __init__(self, **kwargs):
		self.allowed_keys = {
			'id_',
			'name',
			'owner',
			'url'
		}
		self.__dict__.update((k, v) for k, v in kwargs.items() \
									if k in self.allowed_keys)
		self.pins = {}

	def add_pin(self, pin_id, pin):
		if pin_id not in self.pins:
			self.pins[pin_id] = pin


def print_collection(obj):
	ignored_attr = {'allowed_keys'}
	for k, v in obj.items():
		print(v)
		attrs = vars(v)
		for attr, val in attrs.items():
			if '__' in attr or attr == 'allowed_keys':
				continue
			if attr == 'boards':
				print_collection(val)
			print("{}: {}".format(attr, val))

if __name__ == "__main__":
	pins = {}
	pinners = {}
	boards = {}

	with open('pins_formatted.json') as json_file:
		data = json.load(json_file)

		for item in data:
			pinner_data = item['pinner']
			images_data = item['images']
			board_data = item['board']

			if item['id'] not in pins:
				curr_pin = Pin(
					id_=item['id'],
					description=item['description_html'],
					images=images_data,
					like_count=item['like_count'],
					link=item['link'],
					title=item['title']
				)
				pins[curr_pin.id_] = curr_pin
			else:
				curr_pin = pins[item['id']]

			if pinner_data['id'] not in pinners:
				curr_pinner = Pinner(
					id_=pinner_data['id'],
					avatar=pinner_data['image_small_url'],
					full_name=pinner_data['full_name'],
					username=pinner_data['username']
				)

				pinners[curr_pinner.id_] = curr_pinner
			else:
				curr_pinner = pinners[pinner_data['id']]

			if board_data['id'] not in boards:
				curr_board = Board(
					id_=board_data['id'],
					name=board_data['name'],
					owner=board_data['owner'],
					url=board_data['url']
				)

				boards[curr_board.id_] = curr_board
			else:
				curr_board = boards[board_data['id']]

			curr_board.add_pin(curr_pin.id_, curr_pin)
			curr_pinner.add_board(curr_board.id_, curr_board)

	print_collection(pinners)