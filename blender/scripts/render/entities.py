import bpy

scene = bpy.data.scenes["Scene"]
camera = scene.objects["Camera"]
light = scene.objects["Light"]
world = bpy.data.worlds["World"]

player = bpy.data.collections["Player"]
playerEquipedSword = bpy.data.objects["Sword (equiped)"]
playerCarriedSword = bpy.data.objects["Sword (carried)"]

muddyBuddy = bpy.data.collections["MuddyBuddy"]