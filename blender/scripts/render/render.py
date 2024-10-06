import bpy
import entities
from math import *

# tool

def rotate(object, direction):
	rotationUnit = 45
	units = 0

	if (direction == "down"): units = 0
	if (direction == "downRight"): units = 1
	if (direction == "right"): units = 2
	if (direction == "upRight"): units = 3
	if (direction == "up"): units = 4
	if (direction == "upLeft"): units = 5
	if (direction == "left"): units = 6
	if (direction == "downLeft"): units = 7

	object.rotation_euler[2] = units * rotationUnit * (pi / 180.0)

# render character

def renderArmatureFromDirection(object, name, action, direction, frameEnd):
	entities.scene.frame_end = frameEnd
	entities.scene.render.filepath = "./blender/tmp/raw/characters." + name + "." + action + "." + direction + "/"
	bpy.ops.render.render(animation=True)

	object.location.x = 0
	object.location.y = 0

def renderArmatureFromAllDirections(armature, name, action, frameEnd):
	armature.animation_data_create()
	armature.animation_data.action = bpy.data.actions[name + " - " + action]

	directions = ["down", "downRight", "right", "upRight", "up", "upLeft", "left", "downLeft"]
	for direction in directions:
		rotate(armature, direction)
		renderArmatureFromDirection(armature, name, action, direction, frameEnd)

# render

def renderPlayer(action, frameEnd):
	renderArmatureFromAllDirections(
		entities.player.all_objects["Player armature"],
		"player",
		action,
		frameEnd,
	)

def renderMuddyBuddy(action, frameEnd):
	renderArmatureFromAllDirections(
		entities.muddyBuddy.all_objects["MuddyBuddy armature"],
		"muddyBuddy",
		action,
		frameEnd,
	)