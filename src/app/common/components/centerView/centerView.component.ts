import { Graphics } from "pixi.js";
import { Component } from "../component.models";

export class CCenterView extends Component {
	/**
	 * The center of an entity. Used for debugging.
	 */
	centerView: Graphics | null = null;
}