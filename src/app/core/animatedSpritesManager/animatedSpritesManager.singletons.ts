import spritesheetsDatas from "@assets/spritesheetsDatas.json";
import { TAnimatedSprites, TSpritesheets, TTexturePromises, TTextures } from "@root/app/core/animatedSpritesManager/types/loadAnimatedSprites.types";
import { AnimatedSprite, Assets, Spritesheet, SpritesheetData, Texture, TextureSource } from "pixi.js";
import { ANIMATION_SPEEDS } from "./constants/animatedSprites.constants";

TextureSource.defaultOptions.scaleMode = "nearest";

class AnimatedSpritesManager {
	_animatedSprites: TAnimatedSprites | null = null;

	get animatedSprites() {
		if (!this._animatedSprites) throw new Error("Missing animatedSprites.");
		return this._animatedSprites;
	}
	set animatedSprites(value: TAnimatedSprites) {
		this._animatedSprites = value;
	}

	/**
	 * Returns the spritesheet metadata.
	 * @param spritesheetDatas 
	 * @returns 
	 */
	private getAtlasData = (spritesheetDatas: (typeof spritesheetsDatas)[number]) => {
		const frames: SpritesheetData["frames"] = {};
		for (let i = 0; i < spritesheetDatas.framesCount; i++) {
			frames[`${spritesheetDatas.name}${i}`] = {
				frame: {
					x: 0,
					y: i * spritesheetDatas.height,
					w: spritesheetDatas.width,
					h: spritesheetDatas.height,
				},
				sourceSize: {
					w: spritesheetDatas.width,
					h: spritesheetDatas.height,
				},
				spriteSourceSize: {
					x: 0,
					y: 0,
					w: spritesheetDatas.width,
					h: spritesheetDatas.height,
				},
			};
		}

		const atlasData: SpritesheetData = {
			frames: frames,
			meta: {
				image: `src/assets/spritesheets/${spritesheetDatas.name}/spritesheet.png`,
				format: "RGBA8888",
				size: {
					w: spritesheetDatas.width,
					h: spritesheetDatas.height * spritesheetDatas.framesCount,
				},
				scale: 1,
			},
			animations: {
				[spritesheetDatas.name]: Array(spritesheetDatas.framesCount).fill(null).map((_, key: number) => `${spritesheetDatas.name}${key}`),
			},
		};

		return atlasData;
	};

	private getTexturePromises = () => {
		const texturePromises: TTexturePromises = {};

		for (const spritesheetDatas of spritesheetsDatas) {
			texturePromises[spritesheetDatas.name] = Assets.load<Texture>(`src/assets/spritesheets/${spritesheetDatas.name}/spritesheet.png`);
		}

		return texturePromises;
	};

	private getTextures = async (texturePromises: TTexturePromises) => {
		const textures: TTextures = {};

		for (const name in texturePromises) {
			textures[name] = await texturePromises[name];
		}

		return textures;
	};

	private getSpritesheets = async (textures: TTextures) => {
		const spritesheets: Record<string, Spritesheet> = {};

		for (const name in textures) {
			const spritesheet = new Spritesheet(
				textures[name],
				this.getAtlasData(spritesheetsDatas.find(spritesheetDatas => spritesheetDatas.name === name)!),
			);
			spritesheet.parse();
			spritesheets[name] = spritesheet;
		}

		return spritesheets;
	};

	private getAnimatedSprites = async (spritesheets: TSpritesheets) => {
		const animatedSprites: Record<string, AnimatedSprite> = {};

		for (const name in spritesheets) {
			const animation = spritesheets[name].animations[name];
			const animatedSprite = new AnimatedSprite(animation);
			animatedSprite.width *= 3;
			animatedSprite.height *= 3;
			const allDirectionsName = name.replace(/\.[^\\.]*$/, "");
			const animationName: keyof typeof ANIMATION_SPEEDS = allDirectionsName;
			const animationSpeed = ANIMATION_SPEEDS[animationName];
			if (!animationSpeed) throw new Error(`Missing animation speed for ${animationName}.`);
			animatedSprite.animationSpeed = animationSpeed;
			if (name.includes("attacking")) {
				animatedSprite.loop = false;
			}
			animatedSprites[name] = animatedSprite;
		}

		return animatedSprites;
	};

	/**
	 * Loads animated sprites from spritesheets.
	 */
	loadAnimatedSprites = async () => {
		console.time("loadAnimatedSprites");

		const texturePromises = this.getTexturePromises();
		const textures = await this.getTextures(texturePromises);
		const spritesheets = await this.getSpritesheets(textures);
		const animatedSprites = await this.getAnimatedSprites(spritesheets);

		this.animatedSprites = animatedSprites;

		console.timeEnd("loadAnimatedSprites");
	};
}

export const animatedSpritesManager = new AnimatedSpritesManager();