import { TConeHitboxSettings, THitboxSettings, TRectangleHitboxSettings } from "../types/hitbox.types";

export const isConeSettings = (settings: THitboxSettings): settings is TConeHitboxSettings => settings.shape === "cone";
export const isRectangleSettings = (settings: THitboxSettings): settings is TRectangleHitboxSettings => settings.shape === "rectangle";