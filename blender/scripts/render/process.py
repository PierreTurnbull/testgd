import prepare
import render

def processPlayer():
	prepare.preparePlayer.prepareBase()

	prepare.preparePlayer.carrySword()
	render.renderPlayer("standing", 7)
	render.renderPlayer("running", 23)
	
	prepare.preparePlayer.equipSword()
	render.renderPlayer("attacking", 7)

def processMuddyBuddy():
	prepare.prepareMuddyBuddy.prepareBase()

	render.renderMuddyBuddy("standing", 0)
	render.renderMuddyBuddy("rolling", 7)