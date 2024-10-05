import { game } from "@root/domains/game/singletons/game.singletons";
import { TCoordinates } from "@root/domains/space/types/coordinates.types";
import { Ticker } from "pixi.js";
import { MONSTER1_ROLLING_SPEED } from "../constants/movement.constants";
import { ActionsManager } from "@root/domains/actions/models/actionsManager.models";
import { KeyboardManager } from "@root/domains/keyboardManager/models/keyboardManager.models";
import { LocationManager } from "@root/domains/locationManager/models/locationManager.models";
import { MotionManager } from "@root/domains/motionManager/models/motionManager.models";
import { ViewManager } from "@root/domains/viewManager/models/viewManager.models";
import { TDirection } from "@root/domains/space/types/direction.types";
import { Entity } from "@root/app/common/entities/entity.models";

type TMonster1Props = {
	initialCoordinates: TCoordinates
}

export class Monster1 extends Entity {
	constructor(props: TMonster1Props) {
		this.actionsManager = new ActionsManager("standing");
		this.keyboardManager = new KeyboardManager();
		this.locationManager = new LocationManager(props.initialCoordinates);
		this.motionManager = new MotionManager();
		this.viewManager = new ViewManager(game.animatedSprites["characters.monster1.standing.down"], props.initialCoordinates);

		this.watchInput();
	}

	actionsManager: ActionsManager;
	keyboardManager: KeyboardManager;
	locationManager: LocationManager;
	motionManager: MotionManager;
	viewManager: ViewManager;

	rollingSpeed = MONSTER1_ROLLING_SPEED;

	watchInput() {
		// todo : clean this interval
		setInterval(() => {
			if (this.keyboardManager.keyboard.KeyA) this.keyboardManager.keyboard = {
				KeyD: true,
				KeyS: true, 
			};
			else this.keyboardManager.keyboard = {
				KeyA: true,
				KeyW: true, 
			};
		}, 1000);
	}

	startStanding = (direction: TDirection) => {
		this.locationManager.direction = direction;
		this.actionsManager.replaceAction("standing");
		this.viewManager.replaceAnimatedSprite(`characters.monster1.standing.${this.locationManager.direction}`);
	};

	startRolling = (direction: TDirection) => {
		this.locationManager.direction = direction;
		this.actionsManager.replaceAction("rolling");
		this.viewManager.replaceAnimatedSprite(`characters.monster1.rolling.${this.locationManager.direction}`);
	};

	get canStartStanding() {
		const canStartStanding = (
			this.isRolling
		);
		
		return canStartStanding;
	}
	get canStartRolling() {
		const canStartRolling = (
			this.isStanding ||
			this.isRolling
		);

		return canStartRolling;
	}

	get isStanding() {
		return this.actionsManager.currentAction === "standing";
	}
	get isRolling() {
		return this.actionsManager.currentAction === "rolling";
	}

	applyRolling(delta: Ticker) {
		this.motionManager.applyMotion(delta, this.locationManager, this.locationManager.direction, this.rollingSpeed);
		this.viewManager.updateSpriteCoordinates(this.locationManager.coordinates);
	}
}