import "./reset.css"

import * as PIXI from "pixi.js"
import _ from "lodash"

const DIAGONAL_MOVEMENT_FACTOR = Math.sqrt(1 / 2)
const CAT_MOVING_SPEED_PER_SECOND = 8
const CAT_DIAGONAL_MOVING_SPEED_PER_SECOND = CAT_MOVING_SPEED_PER_SECOND * DIAGONAL_MOVEMENT_FACTOR
const ROCKET_MOVING_SPEED_PER_SECOND = 24
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 700

const app = new PIXI.Application({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
// @ts-expect-error: PIXI's typing is failing
document.body.appendChild(app.view)

const background = new PIXI.Graphics()
background.beginFill(0x2A4FAF) // White color for the rectangle
background.drawRect(0, 0, 800, 700) // Rectangle dimensions
background.endFill()

background.eventMode = "static"
background.on("pointerdown", (event) => {
	if (event.button === 2) {
		cat.destCoordinates = { x: event.global.x, y: event.global.y }
	}
})

const mouseCoordinates: TCoordinates = {
	x: 0,
	y: 0,
}

;(app.view as unknown as HTMLElement).addEventListener?.("mousemove", (event) => {
	mouseCoordinates.x = event.clientX
	mouseCoordinates.y = event.clientY
})

app.stage.addChild(background)

const catTexture = await PIXI.Assets.load("./src/assets/images/cat.png")
const rocketTexture = await PIXI.Assets.load("./src/assets/images/rocket.png")
const dogTexture = await PIXI.Assets.load("./src/assets/images/dog.jpg")

type TCoordinates = {
	x: number
	y: number
}

type TAction = (
	"moveLeft" |
	"moveUp" |
	"moveRight" |
	"moveDown"
)

class Cat {
	constructor() {
		this.sprite = new PIXI.Sprite(catTexture)
		this.sprite.width = 60
		this.sprite.height = 60
		this.sprite.x = this.coordinates.x - (this.sprite.width / 2)
		this.sprite.y = this.coordinates.y - (this.sprite.height / 2)

		background.addChild(this.sprite)
	}

	sprite: PIXI.Sprite
	coordinates: TCoordinates = {
		x: 300,
		y: 300,
	}
	destCoordinates: TCoordinates | null = null
	setCoordinates = (newCoordinates: TCoordinates) => {
		this.coordinates = {
			x: newCoordinates.x,
			y: newCoordinates.y,
		}
		this.sprite.x = newCoordinates.x - this.sprite.width / 2
		this.sprite.y = newCoordinates.y - this.sprite.height / 2
	}
	keyboard: Record<KeyboardEvent["code"], boolean> = {}
	rockets: Rocket[] = []
	shootRocket = (destCoordinates: TCoordinates) => {
		const remainingXDistance = destCoordinates.x - this.coordinates.x
		const remainingYDistance = destCoordinates.y - this.coordinates.y
		const movementXRatio = remainingXDistance / (Math.abs(remainingXDistance) + Math.abs(remainingYDistance))
		const movementYRatio = remainingYDistance / (Math.abs(remainingXDistance) + Math.abs(remainingYDistance))

		const rocket = new Rocket({ x: this.coordinates.x, y: this.coordinates.y }, movementXRatio, movementYRatio)
		this.rockets.push(rocket)
		this.destCoordinates = null
	}
}

class Rocket {
	constructor(coordinates: TCoordinates, movementXRatio: number, movementYRatio: number) {
		this.sprite = new PIXI.Sprite(rocketTexture)
		this.sprite.width = 20
		this.sprite.height = 20
		this.coordinates = {
			x: coordinates.x,
			y: coordinates.y,
		}
		this.sprite.x = coordinates.x
		this.sprite.y = coordinates.y
		this.movementXRatio = movementXRatio
		this.movementYRatio = movementYRatio
		this.sprite.angle = 0

		app.stage.addChild(this.sprite)
	}

	sprite: PIXI.Sprite
	movementXRatio: number
	movementYRatio: number
	coordinates: TCoordinates
	setCoordinates = (newCoordinates: TCoordinates) => {
		this.coordinates = {
			x: newCoordinates.x,
			y: newCoordinates.y,
		}
		this.sprite.x = newCoordinates.x - this.sprite.width / 2
		this.sprite.y = newCoordinates.y - this.sprite.height / 2
	}
}

class Dog {
	constructor() {
		this.sprite = new PIXI.Sprite(dogTexture)
		this.sprite.width = 80
		this.sprite.height = 80
		this.sprite.x = 600
		this.sprite.y = 100

		app.stage.addChild(this.sprite)
	}

	sprite: PIXI.Sprite
	destCoordinates: TCoordinates | null = {
		x: 600,
		y: 600,
	}
}

const cat = new Cat()
const dog = new Dog()

document.addEventListener("contextmenu", event => event.preventDefault())

;(app.view as unknown as HTMLElement).addEventListener("mousedown", (event) => {
	cat.shootRocket({ x: event.clientX, y: event.clientY })
})

/**
 * Return the distance on x and the distance on y in order to travel an euclidian distance.
 * @param movementXRatio
 * @param movementYRatio
 * @returns the distance on x and on y
 */
function getEuclidianDistances(euclidianDistance: number, movementXRatio: number, movementYRatio: number) {
	const absXDistance = Math.sqrt(euclidianDistance * euclidianDistance * movementXRatio * movementXRatio / (movementXRatio * movementXRatio + movementYRatio * movementYRatio))
	const absYDistance = Math.sqrt(euclidianDistance * euclidianDistance * movementYRatio * movementYRatio / (movementXRatio * movementXRatio + movementYRatio * movementYRatio))

	const xDistance = movementXRatio < 0 ? -absXDistance : absXDistance
	const yDistance = movementYRatio < 0 ? -absYDistance : absYDistance

	return { xDistance, yDistance }
}

const resetKey = _.debounce((keyCode: string) => {
	if (cat) {
		cat.keyboard[keyCode] = false
	}
}, 250)

window.onkeydown = event => {
	resetKey(event.code)

	if (cat) {
		cat.keyboard[event.code] = true
	}
}

window.onkeyup = event => {
	if (cat) {
		cat.keyboard[event.code] = false
	}
}

const getActionsFromKeyboard = (): TAction[] => {
	const actions: TAction[] = []

	if (cat.keyboard.KeyA) actions.push("moveLeft")
	if (cat.keyboard.KeyW) actions.push("moveUp")
	if (cat.keyboard.KeyD) actions.push("moveRight")
	if (cat.keyboard.KeyS) actions.push("moveDown")

	return actions
}

const processCatMovement = (delta: number, actions: TAction[]) => {
	if (actions.includes("moveLeft") && actions.includes("moveUp")) {
		cat.setCoordinates({
			x: cat.coordinates.x - delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y - delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
		})
	} else if (actions.includes("moveLeft") && actions.includes("moveDown")) {
		cat.setCoordinates({
			x: cat.coordinates.x - delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y + delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
		})
	} else if (actions.includes("moveRight") && actions.includes("moveUp")) {
		cat.setCoordinates({
			x: cat.coordinates.x + delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y - delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
		})
	} else if (actions.includes("moveRight") && actions.includes("moveDown")) {
		cat.setCoordinates({
			x: cat.coordinates.x + delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y + delta * CAT_DIAGONAL_MOVING_SPEED_PER_SECOND,
		})
	} else if (actions.includes("moveLeft")) {
		cat.setCoordinates({
			x: cat.coordinates.x - delta * CAT_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y,
		})
	} else if (actions.includes("moveRight")) {
		cat.setCoordinates({
			x: cat.coordinates.x + delta * CAT_MOVING_SPEED_PER_SECOND,
			y: cat.coordinates.y,
		})
	} else if (actions.includes("moveUp")) {
		cat.setCoordinates({
			x: cat.coordinates.x,
			y: cat.coordinates.y - delta * CAT_MOVING_SPEED_PER_SECOND,
		})
	} else if (actions.includes("moveDown")) {
		cat.setCoordinates({
			x: cat.coordinates.x,
			y: cat.coordinates.y + delta * CAT_MOVING_SPEED_PER_SECOND,
		})
	}
}

const processRocketsMovement = (delta: number) => {
	cat.rockets.forEach((rocket) => {
		processRocketMovement(delta, rocket)
	})
}

const processDogMovement = (delta: number) => {
	if (dog.destCoordinates?.y === 600) {
		dog.sprite.x -= delta * CAT_MOVING_SPEED_PER_SECOND
		dog.sprite.y += delta * CAT_MOVING_SPEED_PER_SECOND
	} else {
		dog.sprite.x += delta * CAT_MOVING_SPEED_PER_SECOND
		dog.sprite.y -= delta * CAT_MOVING_SPEED_PER_SECOND
	}
	if (dog.destCoordinates && dog.sprite.y < 100) dog.destCoordinates.y = 600
	if (dog.destCoordinates && dog.sprite.y > 600) dog.destCoordinates.y = 100
}

const processRocketMovement = (delta: number, rocket: Rocket) => {
	rocket.setCoordinates({
		x: rocket.coordinates.x + rocket.movementXRatio * ROCKET_MOVING_SPEED_PER_SECOND * delta,
		y: rocket.coordinates.y + rocket.movementYRatio * ROCKET_MOVING_SPEED_PER_SECOND * delta,
	})
}

const render = () => {
}

app.ticker.add((delta) => {
	const actions = getActionsFromKeyboard()
	processCatMovement(delta, actions)
	processRocketsMovement(delta)
	processDogMovement(delta)
	render()
})