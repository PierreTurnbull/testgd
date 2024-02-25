import { AnimatedSprite, Texture } from "pixi.js"

export type TActionProps<TActionKey extends string> = {
	key: TActionKey
	animationSpeed: number
	textures: Texture[]
}

export abstract class Action<TActionKey extends string> {
	constructor(props: TActionProps<TActionKey>) {
		this.key = props.key
		this.textures = props.textures
		this.animationSpeed = props.animationSpeed

		this.sprite = new AnimatedSprite(props.textures)
		this.sprite.animationSpeed = props.animationSpeed
		this.sprite.width *= 3
		this.sprite.height *= 3
		this.sprite.play()
	}

	key: TActionKey
	textures: Texture[]
	animationSpeed: number
	sprite: AnimatedSprite
}