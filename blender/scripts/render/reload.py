import bpy
import os

textsToReload = [
	'constants.py',
	'entities.py',
	# 'prepare.py',
	# 'render.py',
	# 'process.py',
]

for textToReload in textsToReload:
	text = bpy.data.texts[textToReload]
	if os.path.isfile(text.filepath):
		with open(text.filepath) as file:
			text.from_string(file.read())