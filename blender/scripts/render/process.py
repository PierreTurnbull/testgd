import prepare
import render

def processPlayer():
	prepare.preparePlayer.prepareBase()

	prepare.preparePlayer.carrySword()
	render.renderPlayer("standing", 7)
	render.renderPlayer("running", 23)
	
	prepare.preparePlayer.equipSword()
	render.renderPlayer("attacking", 7)

def processMonster1():
	prepare.prepareMonster1.prepareBase()

	render.renderMonster1("standing", 0)
	render.renderMonster1("rolling", 7)