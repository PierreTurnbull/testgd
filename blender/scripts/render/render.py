import bpy
import sys
import os
import entities
import contextlib
import constants
from math import *

@contextlib.contextmanager
def silence():
	"""
	Executes the code silently.
	"""

	stdout_fd = os.dup(1)
	stderr_fd = os.dup(2)
	devnull = open(os.devnull, "w")
	os.dup2(devnull.fileno(), 1)
	os.dup2(devnull.fileno(), 2)

	yield

	os.dup2(stdout_fd, 1)  # Restore stdout
	os.dup2(stderr_fd, 2)  # Restore stderr

	# Close the duplicated file descriptors
	os.close(stdout_fd)
	os.close(stderr_fd)
	devnull.close()

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
	entities.scene.render.filepath = "./blender/tmp/raw/animations/characters." + name + "." + action + "." + direction + "/"

	with silence():
		bpy.ops.render.render(animation=True)

	print("Rendered " + name + "." + action + "." + direction)

def renderArmatureFromAllDirections(armature, name, action, frameEnd):
	armature.animation_data_create()
	armature.animation_data.action = bpy.data.actions[name + " - " + action]

	directions = ["down", "downRight", "right", "upRight", "up", "upLeft", "left", "downLeft"]
	for direction in directions:
		rotate(armature, direction)
		renderArmatureFromDirection(armature, name, action, direction, frameEnd)

# render environment

def renderEnvironmentFromDirection(object, name, direction):
	entities.scene.render.filepath = "./blender/tmp/raw/images/environment." + name + "." + direction + "/"

	with silence():
		bpy.ops.render.render(animation=True)

	print("Rendered " + name + "." + direction)

def renderEnvironmentFromAllDirections(environment, name):
	directions = ["down", "downRight", "right", "upRight", "up", "upLeft", "left", "downLeft"]
	for direction in directions:
		rotate(environment, direction)
		renderEnvironmentFromDirection(environment, name, direction)

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

def renderDirt():
	entities.scene.frame_end = 0

	for i in range(0, 10):
		entities.scene.render.filepath = "./blender/tmp/raw/images/environment.dirt." + str(i) + "/"
		entities.dirt.objects[0].location[0] = i * 10
		with silence():
			bpy.ops.render.render(animation=True)

		print("Rendered dirt." + str(i))

def renderRockMD():
	entities.scene.frame_end = 0

	for i in range(0, 4):
		entities.rockMD.all_objects[0].rotation_euler[0] = i * 90 * (pi / 180.0)
		renderEnvironmentFromAllDirections(entities.rockMD.all_objects[0], "rockMD." + str(i))

def renderRockLG():
	entities.scene.frame_end = 0

	for i in range(0, 4):
		entities.rockLG.all_objects[0].rotation_euler[0] = i * 90 * (pi / 180.0)
		renderEnvironmentFromAllDirections(entities.rockLG.all_objects[0], "rockLG." + str(i))