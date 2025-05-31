import spritesDatas from "@assets/sprites/spritesDatas.json";
import spritesheetsDatas from "@assets/spritesheets/spritesheetsDatas.json";
import { TAssetCategory, TSpritesheets, TTexturePromises, TTexturePromisesByCategory, TTextures, TTexturesByCategory } from "@root/app/domains/assetsManager/types/assetsManager.types";
import { Assets, Spritesheet, SpritesheetData, Texture, TextureSource } from "pixi.js";

TextureSource.defaultOptions.scaleMode = "nearest";

class AssetsManager {
	private _spritesheets: TSpritesheets | null = null;
	private _textures:     TTextures | null = null;

	/**
	 * Textures used to create animated sprites.
	 */
	get spritesheets() {
		if (!this._spritesheets) throw new Error("Missing spritesheets.");
		return this._spritesheets;
	}
	set spritesheets(value: TSpritesheets) {
		this._spritesheets = value;
	}

	/**
	 * Textures used to create sprites.
	 */
	get textures() {
		if (!this._textures) throw new Error("Missing textures.");
		return this._textures;
	}
	set textures(value: TTextures) {
		this._textures = value;
	}

	/**
	 * Returns the spritesheet metadata.
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
			meta:   {
				image:  `src/assets/spritesheets/${spritesheetDatas.name}/spritesheet.png`,
				format: "RGBA8888",
				size:   {
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
		const texturePromises: TTexturePromisesByCategory = {
			spritesheets: {},
			sprites:      {},
		};

		for (const spritesheetDatas of spritesheetsDatas) {
			texturePromises.spritesheets[spritesheetDatas.name] = Assets.load<Texture>(`src/assets/spritesheets/${spritesheetDatas.name}/spritesheet.png`);
		}
		for (const spriteDatas of spritesDatas) {
			texturePromises.sprites[spriteDatas.name] = Assets.load<Texture>(`src/assets/sprites/${spriteDatas.name}/0000.png`);
		}

		return texturePromises;
	};

	private getTextures = async (texturePromises: TTexturePromisesByCategory) => {
		const textures: TTexturesByCategory = {
			spritesheets: {},
			sprites:      {},
		};

		const entries = Object.entries(texturePromises);
		
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];

			const category = entry[0] as TAssetCategory;
			const promises = entry[1] as TTexturePromises;

			for (const name in promises) {
				textures[category][name] = await promises[name];
			}
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

	/**
	 * Loads animated sprites from spritesheets.
	 */
	loadAssets = async () => {
		console.time("loadAssets");

		const texturePromises = this.getTexturePromises();
		const textures = await this.getTextures(texturePromises);
		const spritesheets = await this.getSpritesheets(textures.spritesheets);

		this.spritesheets = spritesheets;
		this.textures = textures.sprites;

		console.timeEnd("loadAssets");
	};
}

export const assetsManager = new AssetsManager();