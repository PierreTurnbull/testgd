/**
 * Bounds that can be used to check collisions.
 * A collision occurs when a coordinate's x is between minX and maxX, and
 * its y is between minY and maxY.
 */
export type TCollisionBounds = {
	minX: number
	maxX: number
	minY: number
	maxY: number
}