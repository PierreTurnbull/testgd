import { Sprite, Spritesheet, Texture } from "pixi.js";

export type TAssetCategory = "spritesheets" | "sprites"

export type TTexturePromises = Record<string, Promise<Texture>>
export type TTexturePromisesByCategory = Record<TAssetCategory, TTexturePromises>

export type TTextures = Record<string, Texture>
export type TTexturesByCategory = Record<TAssetCategory, TTextures>

export type TSpritesheets = Record<string, Spritesheet>

export type TSprites = Record<string, Sprite>