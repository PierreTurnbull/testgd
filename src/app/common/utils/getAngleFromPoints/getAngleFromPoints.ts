import { TPoint } from "../../types/point.type";

export const getAngleFromPoints = (a: TPoint, b: TPoint) => {
	const x = b.x - a.x;
	const y = b.y - a.y;

	return (Math.atan2(y, x) * 180) / Math.PI;
};
  