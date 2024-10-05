import { getRequestedDirection } from "@root/domains/actions/logic/getRequestedDirection.logic";
import { Attacking } from "@root/domains/actions/models/actions/attacking.models";
import { Running } from "@root/domains/actions/models/actions/running.models";
import { Standing } from "@root/domains/actions/models/actions/standing.models";
import { ActionsManager } from "@root/domains/actions/models/actionsManager.models";
import { AbstractEntityProcesser } from "@root/domains/entityProcesser/entityProcesser.models";
import { KeyboardManager } from "@root/domains/keyboardManager/models/keyboardManager.models";
import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { MotionManager } from "@root/domains/motionManager/models/motionManager.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";
import { game } from "@root/domains/game/singletons/game.singletons";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { Ticker } from "pixi.js";
import { PLAYER_RUNNING_SPEED } from "../constants/movement.constants";
import { UserInputManager } from "../models/userInputManager.models";
import { PlayerEntityProcesser } from "../models/playerEntityProcesser.models";
import { Entity } from "@root/app/common/entities/entity.models";

type TPlayerProps = {
	initialCoordinates: TCoordinates
}

/**
 * The character controlled by the player.
 */
export class Player extends Entity { 
	constructor(props: TPlayerProps) {
		super();

		this.keyboardManager = new KeyboardManager();
		this.locationManager = new LocationManager(props.initialCoordinates);
		this.motionManager = new MotionManager();
		this.userInputManager = new UserInputManager(this.keyboardManager);
		this.viewManager = new ViewManager(game.animatedSprites["characters.player.standing.down"], props.initialCoordinates);
		this.actionsManager = new ActionsManager(
			[
				Standing,
				Running,
				Attacking,
			],
			"standing",
			this.locationManager,
			this.viewManager,
		);
		this.entityProcesser = new PlayerEntityProcesser(this);
	}

	keyboardManager: KeyboardManager;
	locationManager: LocationManager;
	motionManager: MotionManager;
	userInputManager: UserInputManager;
	viewManager: ViewManager;
	actionsManager: ActionsManager;
	entityProcesser: AbstractEntityProcesser;

	runningSpeed = PLAYER_RUNNING_SPEED;


}