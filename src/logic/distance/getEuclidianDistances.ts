/**
 * Return the distance on x and the distance on y in order to travel an euclidian distance.
 * @param movementXRatio
 * @param movementYRatio
 * @returns the distance on x and on y
 */
export function getEuclidianDistances(euclidianDistance: number, movementXRatio: number, movementYRatio: number) {
	const absXDistance = Math.sqrt(euclidianDistance * euclidianDistance * movementXRatio * movementXRatio / (movementXRatio * movementXRatio + movementYRatio * movementYRatio))
	const absYDistance = Math.sqrt(euclidianDistance * euclidianDistance * movementYRatio * movementYRatio / (movementXRatio * movementXRatio + movementYRatio * movementYRatio))

	const xDistance = movementXRatio < 0 ? -absXDistance : absXDistance
	const yDistance = movementYRatio < 0 ? -absYDistance : absYDistance

	return { xDistance, yDistance }
}