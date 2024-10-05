import { TDirection } from "@root/domains/space/types/direction.types";
import { ActionsManager } from "./actionsManager.models";
import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";

/**
 * An action performed by a character.
 * It can be started if conditions are met.
 */
export abstract class AbstractAction {
	abstract actionsManager: ActionsManager;
	abstract locationManager: LocationManager;
	abstract viewManager: ViewManager;

	abstract canStart(): boolean;
	abstract start(direction?: TDirection, onLoop?: () => void): void; 
}