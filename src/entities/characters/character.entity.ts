import { game } from "@root/game/game"
import { Action } from "../../actions/action.entity"
import { TDirection } from "@root/types/action/direction.type"
import { BaseEntity } from "../baseEntity.entity"
import { TCoordinates } from "@root/types/map/coordinates.type"
import { DIAGONAL_MOVEMENT_FACTOR } from "@root/constants"
import { AnimatedSprite, Texture } from "pixi.js"

type TCharacterProps = {
	coordinates: TCoordinates
	speed: number
}

export abstract class Character<TAction extends Action<string>> extends BaseEntity {
	constructor(props: TCharacterProps) {
		super(props)

		this.speed = props.speed

		this.watchInput()
	}

	beforeReplaceAction = () => {
		this.destroy()
	}

	afterReplaceAction = () => {
		if (!this.sprite) throw new Error("Missing sprite.")

		this.sprite.x = this.coordinates.x - (this.sprite.width / 2)
		this.sprite.y = this.coordinates.y - (this.sprite.height / 2)

		game.background.addChild(this.sprite)
	}

	sprite: AnimatedSprite | null = null
	currentAction: TAction | null = null
	keyboard: Record<KeyboardEvent["code"], boolean> = {}
	abstract watchInput(): void
	abstract replaceAction(newActionKey: TAction["key"], direction: TDirection): void

	speed: number

	applyMovement(delta: number, speed: number, direction: TDirection) {
		if (direction === "upLeft") {
			this.setCoordinates({
				x: this.coordinates.x - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
			})
		} else if (direction === "downLeft") {
			this.setCoordinates({
				x: this.coordinates.x - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
			})
		} else if (direction === "upRight") {
			this.setCoordinates({
				x: this.coordinates.x + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y - delta * speed * DIAGONAL_MOVEMENT_FACTOR,
			})
		} else if (direction === "downRight") {
			this.setCoordinates({
				x: this.coordinates.x + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
				y: this.coordinates.y + delta * speed * DIAGONAL_MOVEMENT_FACTOR,
			})
		} else if (direction === "left") {
			this.setCoordinates({
				x: this.coordinates.x - delta * speed,
				y: this.coordinates.y,
			})
		} else if (direction === "right") {
			this.setCoordinates({
				x: this.coordinates.x + delta * speed,
				y: this.coordinates.y,
			})
		} else if (direction === "up") {
			this.setCoordinates({
				x: this.coordinates.x,
				y: this.coordinates.y - delta * speed,
			})
		} else if (direction === "down") {
			this.setCoordinates({
				x: this.coordinates.x,
				y: this.coordinates.y + delta * speed,
			})
		}
	}
}