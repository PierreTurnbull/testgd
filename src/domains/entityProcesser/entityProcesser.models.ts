import { Ticker } from "pixi.js";

/**
 * A module that contains processing logic for an entity to be processed every frame.
 */
export abstract class AbstractEntityProcesser {
	abstract processState: (delta: Ticker) => void;
}