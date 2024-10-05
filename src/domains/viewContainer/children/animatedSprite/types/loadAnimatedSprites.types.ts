import { Spritesheet, Texture } from "pixi.js";

export type TTexturePromises = Record<string, Promise<Texture>>
export type TTextures = Record<string, Texture>
export type TSpritesheets = Record<string, Spritesheet>
export type TAnimatedSprites = Awaited<ReturnType<typeof getAnimatedSprites>>;