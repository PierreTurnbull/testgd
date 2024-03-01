import { game } from "@root/game/game"
import * as PIXI from "pixi.js"

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST

const getAnimationTextures = async (baseSrc: string, framesCount: number) => {
	return Object.values<PIXI.Texture>(await PIXI.Assets.load(
		Array(framesCount).fill(null).map((_, key: number) => {
			const keyAsString = String(key)
			const leadingZeros = 4 - keyAsString.length
			const formattedKey = "0".repeat(leadingZeros) + keyAsString

			return `${baseSrc}/${formattedKey}.png`
		})
	))
}

const getAnimationTexturesInAllDirections = async (baseSrc: string, framesCount: number) => {
	return {
		up: await getAnimationTextures(`${baseSrc}/up`, framesCount),
		upRight: await getAnimationTextures(`${baseSrc}/upRight`, framesCount),
		right: await getAnimationTextures(`${baseSrc}/right`, framesCount),
		downRight: await getAnimationTextures(`${baseSrc}/downRight`, framesCount),
		down: await getAnimationTextures(`${baseSrc}/down`, framesCount),
		downLeft: await getAnimationTextures(`${baseSrc}/downLeft`, framesCount),
		left: await getAnimationTextures(`${baseSrc}/left`, framesCount),
		upLeft: await getAnimationTextures(`${baseSrc}/upLeft`, framesCount),
	}
}

export const loadTextures = async () => {
	const lastCheckpointDate: Date = new Date()

	console.info("Start loading textures.")

	game.textures = {
		player: {
			standing: await getAnimationTexturesInAllDirections("src/assets/images/characters/player/standing", 8),
			running: await getAnimationTexturesInAllDirections("src/assets/images/characters/player/running", 24),
			attacking: await getAnimationTexturesInAllDirections("src/assets/images/characters/player/attacking", 8),
		},
		monster1: {
			standing: await getAnimationTexturesInAllDirections("src/assets/images/characters/monster1/standing", 1),
			rolling: await getAnimationTexturesInAllDirections("src/assets/images/characters/monster1/rolling", 8),
		}
	}

	console.info(`Textures loaded in ${new Date().getTime() - lastCheckpointDate.getTime()}ms.`)
}