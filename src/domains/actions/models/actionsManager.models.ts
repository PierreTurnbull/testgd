import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { AbstractAction } from "./action.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";
import { TActions } from "../types/actions.types";

/**
 * A manager that provides its user with actions.
 */
export class ActionsManager {
	constructor(
		actionClasses: (new (actionsManager: ActionsManager, locationManager: LocationManager, viewManager: ViewManager) => AbstractAction)[],
		initialActionKey: string,
		locationManager: LocationManager,
		viewManager: ViewManager,
	) {
		// translate the list of actions into a record using their names as keys
		const actionEntries = (
			actionClasses.map<readonly [string, AbstractAction]>(actionClass => {
				const name = actionClass.name.slice(0, 1).toLowerCase() + actionClass.name.slice(1);
				const value = new actionClass(this, locationManager, viewManager);

				return [name, value];
			})
		);
		const actions = Object.fromEntries<AbstractAction>(actionEntries);
		this.actions = actions;

		this.currentActionKey = initialActionKey;
	}

	actions: TActions;
	currentActionKey: string;

	/**
	 * Returns whether actionKey is the current action.
	 */
	is = (actionKey: string) => {
		return this.currentActionKey === actionKey;
	};
}