import { TCoordinates } from "@root/types/map/coordinates.type"
import { actions } from "@root/actions"
import { TPlayerAction, TPlayerActionKey } from "@root/types/action/player/action.type"
import { Character } from "../character.entity"
import { TDirection } from "@root/types/action/direction.type"
import _ from "lodash"
import { playerActions } from "@root/actions/player/playerActions"
import { RunningAction } from "@root/actions/player/running/running.action"
import { PLAYER_DIAGONAL_MOVING_SPEED_PER_SECOND, PLAYER_MOVING_SPEED_PER_SECOND } from "@root/constants"
import { AnimatedSprite } from "pixi.js"
import { game } from "@root/game/game"

type TPlayerProps = {
	coordinates: TCoordinates
}

export class Player extends Character<TPlayerAction> {
	constructor(props: TPlayerProps) {
		super({
			speed: PLAYER_MOVING_SPEED_PER_SECOND,
			...props,
		})

		this.replaceAction("standing", "down")
	}

	watchInput() {
		const resetKey = _.debounce((keyCode: string) => {
			this.keyboard[keyCode] = false
		}, 250)

		window.onkeydown = event => {
			resetKey(event.code)

			if (this) {
				this.keyboard[event.code] = true
			}
		}

		window.onkeyup = event => {
			if (this) {
				this.keyboard[event.code] = false
			}
		}
	}

	replaceAction = (newActionKey: TPlayerActionKey, direction: TDirection) => {
		this.beforeReplaceAction()

		this.direction = direction

		if (newActionKey === "standing") this.startStanding()
		if (newActionKey === "running") this.startRunning()
		if (newActionKey === "attacking") this.startAttacking()

		this.afterReplaceAction()
	}

	private startStanding = () => {
		this.currentAction = new actions.player.Standing({
			direction: this.direction,
		})

		this.sprite = this.currentAction.sprite
	}

	private startRunning = () => {
		this.currentAction = new actions.player.Running({
			direction: this.direction,
		})

		this.sprite = this.currentAction.sprite
	}

	private startAttacking = () => {
		this.currentAction = new actions.player.Attacking({
			direction: this.direction,
		})

		this.sprite = this.currentAction.sprite

		this.sprite.onLoop = () => this.replaceAction("standing", this.direction)
	}

	get canStartStanding() {
		if (this.isStanding) return false

		return this.isRunning
	}
	get canStartRunning() {
		return this.isStanding || this.isRunning
	}
	get canStartAttacking() {
		if (this.isAttacking) return false
	
		return this.isRunning || this.isStanding
	}

	get isStanding() { return this.currentAction instanceof actions.player.Standing }
	get isRunning() { return this.currentAction instanceof actions.player.Running }
	get isAttacking() { return this.currentAction instanceof actions.player.Attacking }

	speed: number = PLAYER_MOVING_SPEED_PER_SECOND

	applyRunning(delta: number) {
		if (!this.currentAction) throw new Error("Missing action.")

		this.applyMovement(delta, this.speed, this.direction)
	}
}