import { Spritesheet, Texture } from "pixi.js";
import { animatedSpritesManager } from "../animatedSpritesManager.singletons";

export type TTexturePromises = Record<string, Promise<Texture>>
export type TTextures = Record<string, Texture>
export type TSpritesheets = Record<string, Spritesheet>
export type TAnimatedSprites = Awaited<ReturnType<typeof animatedSpritesManager["getAnimatedSprites"]>>;