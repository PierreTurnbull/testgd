import { game } from "@root/game/game"
import * as PIXI from "pixi.js"

export const loadTextures = async () => {
	const textures = (await import("@root/textures")).textures

	const texturePromises: Promise<unknown>[] = []

	const subTexturesIsArray = (subTextures: unknown): subTextures is PIXI.Texture[] => subTextures instanceof Array
	const subTexturesIsObject = (subTextures: unknown): subTextures is object => !(subTextures instanceof Array)

	const registerTexturePromises = (subTextures: unknown) => {
		if (subTexturesIsArray(subTextures)) {
			subTextures.forEach((texture: PIXI.Texture) => {
				const promise = new Promise(r => texture.baseTexture.once("loaded", r))
				texturePromises.push(promise)
			})
		} else if (subTexturesIsObject(subTextures)) {
			Object.values(subTextures).forEach(registerTexturePromises)
		}
	}

	Object.values(textures).forEach(registerTexturePromises)

	await Promise.all(texturePromises)

	game.textures = textures
}