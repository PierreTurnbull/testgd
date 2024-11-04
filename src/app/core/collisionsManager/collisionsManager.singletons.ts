import { System } from "detect-collisions";

class CollisionsManager {
	/**
	 * The collision system. It contains all collider objects and computes collisions.
	 */
	system = new System();
}

export const collisionsManager = new CollisionsManager();