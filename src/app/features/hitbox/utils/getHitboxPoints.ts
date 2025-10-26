import { TCoordinates } from "@root/app/features/math/types/coordinates.types";
import { TPoint } from "@root/app/features/math/types/point.type";
import { getAngleInterval } from "@root/app/features/math/utils/getAngleInterval/getAngleInterval";
import { getCirclePoint } from "@root/app/features/math/utils/getCirclePoint/getCirclePoint";
import { HITBOX_BOUNDS } from "../constants/hitboxes.constants";
import { THitboxSettings } from "../types/hitbox.types";
import { isConeSettings, isPolygonSettings, isRectangleSettings } from "./typeGuards";

export const getHitboxPoints = (
	settings: THitboxSettings,
) => {
	let hitboxPoints: TPoint[] | null = null;

	if (isConeSettings(settings)) {
		const circleOrigin: TCoordinates = {
			x: 0,
			y: 0, 
		};
		const angleRange = 70;
		const angleInterval = getAngleInterval(settings.direction, angleRange);
		const intervalsCount = 4;
		const partialAngleRange = angleRange / intervalsCount;
		const circlePoints = Array(intervalsCount + 1).fill(null)
			.map((_, key: number) => getCirclePoint(circleOrigin, settings.size || 0, angleInterval[0] + partialAngleRange * key));
		hitboxPoints = [
			{
				x: 0,
				y: 0,
			},
			...circlePoints,
		];
	} else if (isRectangleSettings(settings)) {
		hitboxPoints = [
			{
				x: 0,
				y: 0,
			},
			{
				x: HITBOX_BOUNDS[settings.name].w,
				y: 0,
			},
			{
				x: HITBOX_BOUNDS[settings.name].w,
				y: HITBOX_BOUNDS[settings.name].h,
			},
			{
				x: 0,
				y: HITBOX_BOUNDS[settings.name].h,
			},
		];
	} else if (isPolygonSettings(settings)) {
		hitboxPoints = settings.points;
	}

	if (!hitboxPoints) {
		throw new Error(`Invalid hitbox shape: ${settings.shape}.`);
	}

	return hitboxPoints;
};