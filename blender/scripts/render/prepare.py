import constants
import entities

# show

def showCollection(collection):
	for child in entities.scene.collection.children:
		child.hide_render = True
	collection.hide_render = False

# prepare

def prepareCharacter():
	entities.scene.render.resolution_x = int(constants.playerDimensionX)
	entities.scene.render.resolution_y = int(constants.playerDimensionY)
	entities.scene.camera = entities.camera
	entities.camera.data.ortho_scale = constants.characterSize
	entities.camera.location.x = 0
	entities.camera.location.y = -10
	entities.camera.location.z = 0
	entities.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.2
	entities.camera.hide_render = False

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

class prepareMonster1:
	@staticmethod
	def prepareBase():
		prepareCharacter()
		showCollection(entities.monster1)
		entities.camera.location.z = 1