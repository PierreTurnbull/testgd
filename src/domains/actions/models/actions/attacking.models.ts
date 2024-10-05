import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { ActionsManager } from "../actionsManager.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";
import { TDirection } from "@root/domains/space/types/direction.types";
import { AbstractAction } from "../action.models";

export class Attacking implements AbstractAction {
	constructor(
		actionsManager: ActionsManager,
		locationManager: LocationManager,
		viewManager: ViewManager,
	) {
		this.actionsManager = actionsManager;
		this.locationManager = locationManager;
		this.viewManager = viewManager;
	}

	actionsManager: ActionsManager;
	locationManager: LocationManager;
	viewManager: ViewManager;

	canStart() {
		const canStartAttacking = (
			this.actionsManager.is("running") ||
			this.actionsManager.is("rolling") ||
			this.actionsManager.is("standing")
		);

		return canStartAttacking;
	}

	start(direction?: TDirection, onLoop?: () => void) {
		if (direction) this.locationManager.direction = direction;
		this.actionsManager.currentActionKey = "attacking";
		this.viewManager.replaceAnimatedSprite(`characters.player.attacking.${this.locationManager.direction}`);
		this.viewManager.animatedSprite.onLoop = onLoop;
	}
}
