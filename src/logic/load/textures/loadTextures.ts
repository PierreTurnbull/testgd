import { game } from "@root/game/game"
import * as PIXI from "pixi.js"

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST

const getAnimationTextures = (baseSrc: string, framesCount: number): Promise<Record<string, PIXI.Texture<PIXI.Resource>>> => {
	const fileNames = Array(framesCount).fill(null).map((_, key: number) => {
		const keyAsString = String(key)
		const leadingZeros = 4 - keyAsString.length
		const formattedKey = "0".repeat(leadingZeros) + keyAsString

		return `${baseSrc}/${formattedKey}.png`
	})
	const texturesPromise = PIXI.Assets.load<PIXI.Texture>(fileNames)

	return texturesPromise
}

const getAnimationTexturesInAllDirections = (baseSrc: string, framesCount: number) => {
	return {
		up: getAnimationTextures(`${baseSrc}/up`, framesCount),
		upRight: getAnimationTextures(`${baseSrc}/upRight`, framesCount),
		right: getAnimationTextures(`${baseSrc}/right`, framesCount),
		downRight: getAnimationTextures(`${baseSrc}/downRight`, framesCount),
		down: getAnimationTextures(`${baseSrc}/down`, framesCount),
		downLeft: getAnimationTextures(`${baseSrc}/downLeft`, framesCount),
		left: getAnimationTextures(`${baseSrc}/left`, framesCount),
		upLeft: getAnimationTextures(`${baseSrc}/upLeft`, framesCount),
	}
}

export const loadTextures = async () => {
	const lastCheckpointDate: Date = new Date()

	console.info("Start loading textures.")

	// const atlasData1 = {
	// 	frames: {
	// 		playerRunningDown0: {
	// 			frame: { x: 0, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown1: {
	// 			frame: { x: 64, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown2: {
	// 			frame: { x: 128, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown3: {
	// 			frame: { x: 192, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown4: {
	// 			frame: { x: 256, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown5: {
	// 			frame: { x: 320, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown6: {
	// 			frame: { x: 384, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown7: {
	// 			frame: { x: 448, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown8: {
	// 			frame: { x: 512, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown9: {
	// 			frame: { x: 576, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown10: {
	// 			frame: { x: 640, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown11: {
	// 			frame: { x: 704, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown12: {
	// 			frame: { x: 768, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown13: {
	// 			frame: { x: 832, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown14: {
	// 			frame: { x: 896, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown15: {
	// 			frame: { x: 960, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown16: {
	// 			frame: { x: 1024, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown17: {
	// 			frame: { x: 1088, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown18: {
	// 			frame: { x: 1152, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown19: {
	// 			frame: { x: 1216, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown20: {
	// 			frame: { x: 1280, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown21: {
	// 			frame: { x: 1344, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown22: {
	// 			frame: { x: 1408, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 		playerRunningDown23: {
	// 			frame: { x: 1472, y: 0, w: 64, h: 64 },
	// 			sourceSize: { w: 64, h: 64 },
	// 			spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 }
	// 		},
	// 	},
	// 	meta: {
	// 		image: "/spritesheets/down/spritesheet.png",
	// 		format: "RGBA8888",
	// 		size: { w: 1536, h: 64 },
	// 		scale: 1 / 3,
	// 	},
	// 	animations: {
	// 		playerRunningDown: ["playerRunningDown0","playerRunningDown1","playerRunningDown2","playerRunningDown3","playerRunningDown4","playerRunningDown5","playerRunningDown6","playerRunningDown7","playerRunningDown8","playerRunningDown9","playerRunningDown10","playerRunningDown11","playerRunningDown12","playerRunningDown13","playerRunningDown14","playerRunningDown15","playerRunningDown16","playerRunningDown17","playerRunningDown18","playerRunningDown19","playerRunningDown20","playerRunningDown21","playerRunningDown22","playerRunningDown23",],
	// 	}
	// }

	// const atlasData2 = structuredClone(atlasData1)
	// atlasData2.meta.image = "/spritesheets/up/spritesheet.png"
	// Object.entries(atlasData2.frames).forEach(a => {
	// 	atlasData2.frames[a[0].replace("playerRunningDown", "playerRunningUp")] = atlasData2.frames[a[0]]
	// 	delete atlasData2.frames[a[0]]
	// })
	// atlasData2.animations.playerRunningUp = atlasData2.animations.playerRunningDown.map(a => a.replace("playerRunningDown", "playerRunningUp"))
	// delete atlasData2.animations.playerRunningDown

	// const spritesheet = new PIXI.Spritesheet(
	// 	PIXI.BaseTexture.from(atlasData1.meta.image),
	// 	atlasData1,
	// )

	// await spritesheet.parse()

	// const j = new PIXI.AnimatedSprite(spritesheet.animations.playerRunningDown)
	// j.animationSpeed = 0.1
	// j.play()
	// game.background.addChild(j)

	const textures = {}

	const promises: Promise<Record<string, PIXI.Texture<PIXI.Resource>>>[] = []

	const recursivelyRegisterPromises = (entry: [string, unknown]) => {
		const value = entry[1]

		const isPromises = ((value: unknown): value is ReturnType<typeof getAnimationTextures> => {
			return value instanceof Promise
		})(value)
		const isObject = ((_: unknown): _ is object => !isPromises)(value)

		if (isPromises) {
			promises.push(value)
		} else if (isObject) {
			Object.entries(value).forEach(recursivelyRegisterPromises)
		}
	}

	Object.entries(textures).forEach(recursivelyRegisterPromises)

	await Promise.all(promises)

	console.info(`Textures loaded in ${new Date().getTime() - lastCheckpointDate.getTime()}ms.`)
}