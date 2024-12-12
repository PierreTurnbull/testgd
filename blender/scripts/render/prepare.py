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

def prepareBase():
	entities.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.5

def prepareCharacter():
	entities.scene.render.resolution_x = int(constants.characterDimensionX)
	entities.scene.render.resolution_y = int(constants.characterDimensionY)
	entities.scene.camera = entities.camera
	entities.camera.data.ortho_scale = constants.characterSize
	entities.camera.location.x = 0
	entities.camera.location.y = -10
	entities.camera.location.z = 0
	entities.camera.hide_render = False
	entities.camera.rotation_euler[0] = 90 * (pi / 180.0)
	entities.camera.rotation_euler[1] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[2] = 0 * (pi / 180.0)

def prepareGround():
	showCollection(entities.dirt)
	entities.scene.render.resolution_x = int(constants.groundDimensionX)
	entities.scene.render.resolution_y = int(constants.groundDimensionY)
	entities.camera.data.ortho_scale = constants.groundSize
	entities.camera.location.x = 0
	entities.camera.location.y = 0
	entities.camera.location.z = 13
	entities.camera.rotation_euler[0] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[1] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[2] = 0 * (pi / 180.0)

def prepareRockMD():
	showCollection(entities.rockMD)
	entities.scene.render.resolution_x = int(constants.rockMDDimensionX)
	entities.scene.render.resolution_y = int(constants.rockMDDimensionY)
	entities.camera.data.ortho_scale = constants.rockMDSize
	entities.camera.location.x = 0
	entities.camera.location.y = -10
	entities.camera.location.z = 5
	entities.camera.rotation_euler[0] = 70 * (pi / 180.0)
	entities.camera.rotation_euler[1] = 0 * (pi / 180.0)
	entities.camera.rotation_euler[2] = 0 * (pi / 180.0)

def prepareRockLG():
	showCollection(entities.rockLG)
	entities.scene.render.resolution_x = int(constants.rockLGDimensionX)
	entities.scene.render.resolution_y = int(constants.rockLGDimensionY)
	entities.camera.data.ortho_scale = constants.rockLGSize
	entities.camera.location.x = 0
	entities.camera.location.y = -35
	entities.camera.location.z = 15
	entities.camera.rotation_euler[0] = 70 * (pi / 180.0)
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