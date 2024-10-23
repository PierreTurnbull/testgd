import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CUser } from "@root/app/common/components/identity/user/user.component";
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
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";
import { Graphics } from "pixi.js";

export const createPlayer = (
	initialCoordinates: TCoordinates,
) => {
	const centerOffset = ENTITIES_CENTER_OFFSETS["characters.player.hitboxBorder"];
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
			x: HITBOX_BOUNDS["characters.player"].w,
			y: 0,
		},
		{
			x: HITBOX_BOUNDS["characters.player"].w,
			y: HITBOX_BOUNDS["characters.player"].h,
		},
		{
			x: 0,
			y: HITBOX_BOUNDS["characters.player"].h,
		},
	];
	const hitboxBody = collisionsManager.system.createPolygon(
		hitboxCoordinates,
		hitboxPoints,
	);

	const animatedSprite = initAnimatedSprite("characters.player.standing.down", initialCoordinates);

	let border: Graphics | null = null;
	let hitboxBorder: Graphics | null = null;
	let center: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorder(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityHitbox) {
		hitboxBorder = initHitboxBorder("characters.player", hitboxPoints, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		center = initCenter("characters.player", initialCoordinates);
	}

	const actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	const availableActions = ["standing", "running", "attacking"];
	const currentAction = "standing";

	createEntity(
		"player",
		[
			// identity
			new CUser(),

			// misc
			new CKeyboard(),
			new CLocation(initialCoordinates),
			new CDirection(),
			new CVelocity(actionVelocities),
			new CAction(currentAction, availableActions),
			new CHitbox(hitboxBody, "characters.player.hitboxBorder"),

			// views
			new CView(animatedSprite),
			new CBorderView(border),
			new CHitboxView(hitboxBorder),
			new CCenterView(center),
		],
	);
};