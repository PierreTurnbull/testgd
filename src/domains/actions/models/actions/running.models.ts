import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { ActionsManager } from "../actionsManager.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";
import { TDirection } from "@root/domains/space/types/direction.types";
import { AbstractAction } from "../action.models";

export class Running implements AbstractAction {
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
		const canStartRunning = (
			this.actionsManager.is("standing") ||
			this.actionsManager.is("running") ||
			this.actionsManager.is("rolling")
		);

		return canStartRunning;
	}

	start(direction?: TDirection) {
		if (direction) this.locationManager.direction = direction;
		this.actionsManager.currentActionKey = "running";
		this.viewManager.replaceAnimatedSprite(`characters.player.running.${this.locationManager.direction}`);
	}
}