import { TPoint } from "../../../types/point.type";

/**
 * Returns the angle formed by the points A, B and C.
 */
export const getAngleABC = (A: TPoint, B: TPoint, C: TPoint) => {
	// calculate the vectors AB and BC
	const AB = { x: A.x - B.x, y: A.y - B.y };
	const BC = { x: C.x - B.x, y: C.y - B.y };
    
	// calculate the dot product of AB and BC
	const dotProduct = AB.x * BC.x + AB.y * BC.y;
    
	// calculate the magnitudes of AB and BC
	const magnitudeAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
	const magnitudeBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);
    
	// calculate the cosine of the angle using the dot product formula
	const cosTheta = dotProduct / (magnitudeAB * magnitudeBC);
    
	// calculate the angle in radians and then convert to degrees
	const angleRadians = Math.acos(cosTheta);
	const angleDegrees = angleRadians * (180 / Math.PI);
    
	return angleDegrees;
};