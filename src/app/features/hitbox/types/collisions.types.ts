type TCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

type TSide = "top" | "bottom" | "left" | "right"

/**
 * Collisions of one collider with another. It is unilateral: only one of the colliders'
 * collisions are taken into account.
 */
type TUnilateralCollisions = Record<TCorner, TSide>;

/**
 * Collisions of 2 colliders. Includes collisions of both colliders.
 */
export type TCollisions = {
	a: TUnilateralCollisions,
	b: TUnilateralCollisions,
}