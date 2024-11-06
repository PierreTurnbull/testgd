import constants
import entities
from math import *

# show

def showCollection(collection):
	for category in entities.scene.collection.children:
		for child in category.children:
			child.hide_render = True
	collection.hide_render = False

# prepare

def prepareCharacter():
	entities.scene.render.resolution_x = int(constants.characterDimensionX)
	entities.scene.render.resolution_y = int(constants.characterDimensionY)
	entities.scene.camera = entities.camera
	entities.camera.data.ortho_scale = constants.characterSize
	entities.camera.location.x = 0
	entities.camera.location.y = -10
	entities.camera.location.z = 0
	entities.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.2
	entities.camera.hide_render = False
	entities.camera.rotation_euler[0] = 90 * (pi / 180.0)
	entities.camera.rotation_euler[1] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[2] = 0 * (pi / 180.0)

def prepareEnvironment():
	entities.scene.render.resolution_x = int(constants.environmentDimensionX)
	entities.scene.render.resolution_y = int(constants.environmentDimensionY)
	entities.camera.data.ortho_scale = constants.environmentSize
	entities.camera.location.x = 0
	entities.camera.location.y = 0
	entities.camera.location.z = 13
	entities.camera.rotation_euler[0] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[1] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[2] = 0 * (pi / 180.0)

class preparePlayer:
	@staticmethod
	def prepareBase():
		prepareCharacter()
		showCollection(entities.player)

	@staticmethod
	def equipSword():
		entities.playerCarriedSword.hide_render = True
		entities.playerEquipedSword.hide_render = False

	@staticmethod
	def carrySword():
		entities.playerCarriedSword.hide_render = False
		entities.playerEquipedSword.hide_render = True

class prepareMuddyBuddy:
	@staticmethod
	def prepareBase():
		prepareCharacter()
		showCollection(entities.muddyBuddy)
		entities.camera.location.z = 1

class prepareDirt:
	@staticmethod
	def prepareBase():
		prepareEnvironment()
		showCollection(entities.dirt)