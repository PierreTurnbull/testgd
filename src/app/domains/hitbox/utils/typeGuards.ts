import { TConeHitboxSettings, THitboxSettings, TPolygonHitboxSettings, TRectangleHitboxSettings } from "../types/hitbox.types";

export const isConeSettings = (settings: THitboxSettings): settings is TConeHitboxSettings => settings.shape === "cone";
export const isRectangleSettings = (settings: THitboxSettings): settings is TRectangleHitboxSettings => settings.shape === "rectangle";
export const isPolygonSettings = (settings: THitboxSettings): settings is TPolygonHitboxSettings => settings.shape === "polygon";