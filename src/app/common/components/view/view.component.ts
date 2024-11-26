import { AnimatedSprite, Sprite, ViewContainer } from "pixi.js";
import { Component } from "../component.models";

/**
 * An animated sprite is the dynamic representation of an entity.
 */
export class CView extends Component {
	constructor(
		initialView: Sprite | AnimatedSprite,
	) {
		super();

		this.view = initialView;
	}

	view: ViewContainer;
}