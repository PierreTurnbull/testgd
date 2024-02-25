import { TDirection } from "@root/types/action/direction.type"
import { TCoordinates } from "@root/types/map/coordinates.type"
import { AnimatedSprite, Sprite } from "pixi.js"

type TBaseEntityProps = {
	coordinates: TCoordinates
}

export class BaseEntity {
	constructor(props: TBaseEntityProps) {
		this.coordinates = props.coordinates
	}

	setCoordinates = (newCoordinates: TCoordinates) => {
		if (!this.sprite) throw new Error("Cannot set coordinates: missing sprite.")

		this.coordinates = {
			x: newCoordinates.x,
			y: newCoordinates.y,
		}
		this.sprite.x = newCoordinates.x - this.sprite.width / 2
		this.sprite.y = newCoordinates.y - this.sprite.height / 2
	}

	destroy = () => {
		this.sprite?.destroy()
	}

	sprite: Sprite | AnimatedSprite | null = null
	direction: TDirection = "down"
	coordinates: TCoordinates
}