import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CUser } from "@root/app/common/components/identity/user/user.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/initAnimatedSprite";
import { initBorder } from "@root/app/common/views/utils/border/initBorder";
import { initCenter } from "@root/app/common/views/utils/center/initCenter";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";
import { Graphics } from "pixi.js";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { actorArchetype } from "@root/app/common/archetypes/actor/actor.archetype";

export const createPlayer = (
	initialCoordinates: TCoordinates,
) => {
	const animatedSprite = initAnimatedSprite("characters.player.standing.down", initialCoordinates);

	let border: Graphics | null = null;
	let center: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorder(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		center = initCenter("characters.player", initialCoordinates);
	}

	const actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.player;
	const currentAction = "standing";

	const playerEntity = createEntity(
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
			new CHealth(1),

			// views
			new CView(animatedSprite),
			new CBorderView(border),
			new CCenterView(center),
		],
	);

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: playerEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const hitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.player.motion.hitboxBorder"];
	if (!hitboxCenterOffset) {
		throw new Error("Missing center offset for player.");
	}

	const hitboxSettings: TRectangleHitboxSettings = {
		type:                "motion",
		shape:               "rectangle",
		initialCoordinates:  initialCoordinates,
		name:                "characters.player.motion",
		collisionCandidates: [actorArchetype],
		isActive:            true,
		offset:              hitboxCenterOffset,
	};

	createHitbox(
		playerEntity,
		hitboxSettings,
	);

	return playerEntity;
};