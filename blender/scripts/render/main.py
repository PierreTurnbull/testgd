import bpy
import os
import time
import sys
import json
from math import *

start0 = time.time()

sys.path.append("/Users/pierreturnbull/Desktop/games/testgd/blender/scripts/render")

import process

projection: dict[str, list[str]] = {}

if "PROJECTION" in os.environ:
	projectionStr = os.environ["PROJECTION"]
	projection = json.loads(projectionStr)

mustProcessAll = len(projection.keys()) == 0

if mustProcessAll or "player" in projection:
	process.processPlayer(projection.get("player"))
if mustProcessAll or "muddyBuddy" in projection:
	process.processMuddyBuddy(projection.get("muddyBuddy"))
if mustProcessAll or "dirt" in projection:
	process.processDirt()
if mustProcessAll or "rock" in projection:
	process.processRock()

bpy.context.scene.render.filepath = "//render/test/"

end0 = time.time()

print("Rendered in " + str(round(end0 - start0, 1)) + "s.")
