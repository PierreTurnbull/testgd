import prepare
import render

def processPlayer(actionsProjection):
	prepare.preparePlayer.prepareBase()

	prepare.preparePlayer.carrySword()

	mustRenderAll = actionsProjection == True or not actionsProjection

	if mustRenderAll or "standing" in actionsProjection:
		render.renderPlayer("standing", 7)
	if mustRenderAll or "running" in actionsProjection:
		render.renderPlayer("running", 23)
	if mustRenderAll or "dying" in actionsProjection:
		render.renderPlayer("dying", 23)
	if mustRenderAll or "beingDead" in actionsProjection:
		render.renderPlayer("beingDead", 0)

	prepare.preparePlayer.equipSword()
	if mustRenderAll or "attacking" in actionsProjection:
		render.renderPlayer("attacking", 11)

def processMuddyBuddy(actionsProjection):
	prepare.prepareMuddyBuddy.prepareBase()

	mustRenderAll = actionsProjection == True or not actionsProjection

	if mustRenderAll or "standing" in actionsProjection:
		render.renderMuddyBuddy("standing", 0)
	if mustRenderAll or "rolling" in actionsProjection:
		render.renderMuddyBuddy("rolling", 7)
	if mustRenderAll or "dying" in actionsProjection:
		render.renderMuddyBuddy("dying", 7)
	if mustRenderAll or "beingDead" in actionsProjection:
		render.renderMuddyBuddy("beingDead", 0)