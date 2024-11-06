import { actorArchetype } from "@root/app/common/archetypes/actor/actor.archetype";
import { CAction } from "@root/app/common/components/action/action.component";
import { CBorderView } from "@root/app/common/components/border/border.component";
import { CCenterView } from "@root/app/common/components/centerView/centerView.component";
import { CDamage } from "@root/app/common/components/damage/damage.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { TDirection } from "@root/app/common/components/direction/types/direction.types";
import { CHealth } from "@root/app/common/components/health/health.component";
import { CMuddyBuddy } from "@root/app/common/components/identity/muddyBuddy/muddyBuddy.component";
import { CProjectile } from "@root/app/common/components/identity/projectile/projectile.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { relationsManager } from "@root/app/common/relations/relationsManager.singleton";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { ENTITIES_CENTER_OFFSETS } from "@root/app/common/views/constants/views.constants";
import { initAnimatedSprite } from "@root/app/common/views/utils/animatedSprite/initAnimatedSprite";
import { initBorder } from "@root/app/common/views/utils/border/initBorder";
import { initCenter } from "@root/app/common/views/utils/center/initCenter";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";
import { Graphics } from "pixi.js";
import { TRectangleHitboxSettings } from "../../hitbox/types/hitbox.types";
import { createHitbox } from "../../hitbox/utils/createHitbox";
import { CMustBeDestroyedOnCollision } from "../../projectile/components/mustBeDestroyedOnCollision/mustBeDestroyedOnCollision.component";
import { playerArchetype } from "@root/app/common/archetypes/player/player.archetype";
import { CPostHitInvincibility } from "@root/app/common/components/postHitInvincibility/postHitInvincibility.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { wallArchetype } from "@root/app/common/archetypes/wall/wall.archetype";

export const createMuddyBuddy = (
	initialCoordinates: TCoordinates,
	initialDirection: TDirection = "down",
) => {
	const animatedSprite = initAnimatedSprite(`characters.muddyBuddy.standing.${initialDirection}`, initialCoordinates);

	let border: Graphics | null = null;
	let center: Graphics | null = null;

	if (configManager.config.debug.showsEntityBorders) {
		border = initBorder(animatedSprite, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityCenter) {
		center = initCenter("characters.muddyBuddy", initialCoordinates);
	}

	const actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};

	const availableActions = AVAILABLE_ACTIONS.muddyBuddy;
	const currentAction = "standing";


	const muddyBuddyEntity = createEntity(
		"muddyBuddy",
		[
			// identity
			new CMuddyBuddy(),
			new CProjectile("ram"),

			// misc
			new CKeyboard(),
			new CLocation(initialCoordinates),
			new CDirection(initialDirection),
			new CVelocity(actionVelocities),
			new CAction(currentAction, availableActions),
			new CHealth(3),
			new CMustBeDestroyedOnCollision(false),
			new CDamage(1),
			new CPostHitInvincibility(),
			
			// views
			new CView(animatedSprite),
			new CBorderView(border),
			new CCenterView(center),
		],
	);

	relationsManager.createRelation({
		a: {
			key:   "parent",
			value: muddyBuddyEntity, 
		},
		b: {
			key:   "hitboxes",
			value: [], 
		},
		mustCascadeDelete: true,
	});

	const damageHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.damage.hitboxBorder"];
	if (!damageHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
	}

	const motionHitboxCenterOffset = ENTITIES_CENTER_OFFSETS["characters.muddyBuddy.motion.hitboxBorder"];
	if (!motionHitboxCenterOffset) {
		throw new Error("Missing center offset for muddyBuddy.");
	}

	const baseHitboxSettings: Pick<TRectangleHitboxSettings, "shape"> = {
		shape: "rectangle",
	};

	const motionHitboxSettings: TRectangleHitboxSettings = {
		...baseHitboxSettings,
		name:                "characters.muddyBuddy.motion",
		type:                "motion",
		collisionCandidates: [wallArchetype],
		isActive:            true,
		initialCoordinates:  initialCoordinates,
		offset:              damageHitboxCenterOffset,
	};

	const damageHitboxSettings: TRectangleHitboxSettings = {
		...baseHitboxSettings,
		name:                "characters.muddyBuddy.damage",
		type:                "damage",
		collisionCandidates: [playerArchetype],
		isActive:            false,
		initialCoordinates:  initialCoordinates,
		offset:              motionHitboxCenterOffset,
	};

	// motion hitbox
	createHitbox(
		muddyBuddyEntity,
		motionHitboxSettings,
	);

	// damage hitbox
	createHitbox(
		muddyBuddyEntity,
		damageHitboxSettings,
	);

	return muddyBuddyEntity;
};