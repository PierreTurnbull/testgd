import bpy
import os
import time
import sys
from math import *

start0 = time.time()

sys.path.append("/Users/pierreturnbull/Desktop/games/testgd/blender/scripts/render")

import process

projection: dict[str, list[str]] = {}

if "PROJECTION" in os.environ:
	projectionStr = os.environ["PROJECTION"].split(",")

	# populate projection
	for projectionStrItem in projectionStr:
		path = projectionStrItem.split(".")
		entityName = path[0]
		actionName = path[1] if len(path) > 1 else "all"

		if entityName not in projection:
			projection[entityName] = []
		projection[entityName].append(actionName)

	# filter out duplicates
	for key in projection:
		if next((x for x in projection[key] if x == "all"), None):
			projection[key] = ["all"]

	print("Projection:", projection)

mustProcessAll = len(projection.keys()) == 0

if mustProcessAll or "player" in projection:
	process.processPlayer(projection.get("player"))
if mustProcessAll or "muddyBuddy" in projection:
	process.processMuddyBuddy(projection.get("muddyBuddy"))

bpy.context.scene.render.filepath = "//render/test/"

end0 = time.time()

print("Rendered in " + str(round(end0 - start0, 1)) + "s.")
