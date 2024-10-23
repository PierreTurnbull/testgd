import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CMuddyBuddy } from "@root/app/common/components/identity/muddyBuddy/muddyBuddy.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { HITBOX_BOUNDS } from "@root/app/common/hitboxes/constants/hitboxes.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/initAnimatedSprite";
import { initBorder } from "@root/app/common/views/utils/border/initBorder";
import { initCenter } from "@root/app/common/views/utils/center/initCenter";
import { initHitboxBorder } from "@root/app/common/views/utils/hitboxBorder/initHitboxBorder";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";
import { Graphics } from "pixi.js";

export const createMuddyBuddy = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = "down",
) => {
	const centerOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.hitboxBorder"];
	const hitboxCoordinates: TCoordinates = {
		x: initialCoordinates.x + centerOffset.x,
		y: initialCoordinates.y + centerOffset.y,
	};
	const hitboxPoints: TPoint[] = [
		{
			x: 0,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.muddyBuddy"].w,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.muddyBuddy"].w,
			y: HITBOX_BOUNDS["characters.muddyBuddy"].h,
		},
		{
			x: 0,
			y: HITBOX_BOUNDS["characters.muddyBuddy"].h,
		},
	];
	const hitboxBody = collisionsManager.system.createPolygon(
		hitboxCoordinates,
		hitboxPoints,
	);

	const animatedSprite = initAnimatedSprite(`characters.muddyBuddy.standing.${initialDirection}`, initialCoordinates);

	let border: Graphics | null = null;
	let hitboxBorder: Graphics | null = null;
	let center: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorder(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityHitbox) {
		hitboxBorder = initHitboxBorder("characters.muddyBuddy", hitboxPoints, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		center = initCenter("characters.muddyBuddy", initialCoordinates);
	}

	const actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};

	const availableActions = ["standing", "rolling", "dying", "dead"];
	const currentAction = "standing";


	createEntity(
		"muddyBuddy",
		[
			// identity
			new CMuddyBuddy(),

			// misc
			new CKeyboard(),
			new CLocation(initialCoordinates),
			new CDirection(initialDirection),
			new CVelocity(actionVelocities),
			new CAction(currentAction, availableActions),
			new CHitbox(hitboxBody, "characters.muddyBuddy.hitboxBorder"),
			new CHealth(1),
			
			// views
			new CView(animatedSprite),
			new CBorderView(border),
			new CHitboxView(hitboxBorder),
			new CCenterView(center),
		],
	);
};