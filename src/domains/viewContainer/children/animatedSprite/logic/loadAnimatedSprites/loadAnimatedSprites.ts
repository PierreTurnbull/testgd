import spritesheetsDatas from "@assets/spritesheetsDatas.json";
import * as PIXI from "pixi.js";
import { TSpritesheets, TTexturePromises, TTextures } from "./loadAnimatedSprites.type";
import { ANIMATION_SPEEDS } from "../../constants/animatedSprites.constants";
import { game } from "@root/domains/game/singletons/game.singletons";

PIXI.TextureSource.defaultOptions.scaleMode = "nearest";

const getAtlasData = (spritesheetDatas: (typeof spritesheetsDatas)[number]) => {
	const frames: PIXI.SpritesheetData["frames"] = {};
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

	const atlasData: PIXI.SpritesheetData = {
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

const getTexturePromises = () => {
	const texturePromises: TTexturePromises = {};

	for (const spritesheetDatas of spritesheetsDatas) {
		texturePromises[spritesheetDatas.name] = PIXI.Assets.load<PIXI.Texture>(`src/assets/spritesheets/${spritesheetDatas.name}/spritesheet.png`);
	}

	return texturePromises;
};

const getTextures = async (texturePromises: TTexturePromises) => {
	const textures: TTextures = {};

	for (const name in texturePromises) {
		textures[name] = await texturePromises[name];
	}

	return textures;
};

const getSpritesheets = async (textures: TTextures) => {
	const spritesheets: Record<string, PIXI.Spritesheet> = {};

	for (const name in textures) {
		const spritesheet = new PIXI.Spritesheet(
			textures[name],
			getAtlasData(spritesheetsDatas.find(spritesheetDatas => spritesheetDatas.name === name)!),
		);
		spritesheet.parse();
		spritesheets[name] = spritesheet;
	}

	return spritesheets;
};

export const getAnimatedSprites = async (spritesheets: TSpritesheets) => {
	const animatedSprites: Record<string, PIXI.AnimatedSprite> = {};

	for (const name in spritesheets) {
		const animation = spritesheets[name].animations[name];
		const animatedSprite = new PIXI.AnimatedSprite(animation);
		animatedSprite.width *= 3;
		animatedSprite.height *= 3;
		const allDirectionsName = name.replace(/\.[^\\.]*$/, "");
		const animationName: keyof typeof ANIMATION_SPEEDS = allDirectionsName;
		const animationSpeed = ANIMATION_SPEEDS[animationName];
		if (!animationSpeed) throw new Error(`Missing animation speed for ${animationName}.`);
		animatedSprite.animationSpeed = animationSpeed;
		animatedSprites[name] = animatedSprite;
	}

	return animatedSprites;
};

export const loadAnimatedSprites = async () => {
	console.time("loadAnimatedSprites");

	const texturePromises = getTexturePromises();
	const textures = await getTextures(texturePromises);
	const spritesheets = await getSpritesheets(textures);
	const animatedSprites = await getAnimatedSprites(spritesheets);

	game.animatedSprites = animatedSprites;

	console.timeEnd("loadAnimatedSprites");
};