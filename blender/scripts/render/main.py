import bpy
import os
import time
import sys
from math import *

start0 = time.time()

sys.path.append("/Users/pierreturnbull/Desktop/games/testgd/blender/scripts/render")

import process

process.processPlayer()
process.processMuddyBuddy()

bpy.context.scene.render.filepath = "//render/test/"

end0 = time.time()

print("Rendered in " + str(round(end0 - start0, 1)) + "s.")
