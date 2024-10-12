/**
 * Returns a path without the direction part.
 */
export const trimDirection = (path: string) => {
	return path.replace(/\.(upLeft|upRight|downLeft|downRight|up|down|left|right)/, "");
}; 