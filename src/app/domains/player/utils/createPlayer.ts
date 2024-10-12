import { setAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/setAnimatedSprite";
import { setBorder } from "@root/app/common/animatedSprites/utils/border/setBorder";
import { setHitboxBorder } from "@root/app/common/animatedSprites/utils/hitboxBorder/setHitboxBorder";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CHitbox } from "@root/app/common/components/hitbox/hitbox.component";
import { CHitboxView } from "@root/app/common/components/hitboxView/hitboxView.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CUser } from "@root/app/common/components/user/user.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.component";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { HITBOX_BOUNDS } from "@root/app/common/hitboxes/constants/hitboxes.constants";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TDimensions } from "@root/app/common/types/dimensions.types";
import { collisionsManager } from "@root/app/core/collisionsManager/collisionsManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";

export const createPlayer = (
	initialCoordinates: TCoordinates,
) => {
	const userComponent = new CUser();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	const hitboxComponent = new CHitbox();
	const hitboxViewComponent = new CHitboxView();

	locationComponent.coordinates = initialCoordinates;

	const hitboxCoordinates: TCoordinates = {
		x: initialCoordinates.x - HITBOX_BOUNDS["characters.player"].w / 2,
		y: initialCoordinates.y - HITBOX_BOUNDS["characters.player"].h / 2,
	};
	const hitbox = collisionsManager.createBox(
		hitboxCoordinates,
		HITBOX_BOUNDS["characters.player"].w,
		HITBOX_BOUNDS["characters.player"].h,
	);
	hitboxComponent.body = hitbox;

	setAnimatedSprite(viewComponent, "characters.player.standing.down", initialCoordinates);

	if (configManager.config.debug.showsEntityBorders) {
		setBorder(viewComponent, initialCoordinates);
	}

	if (configManager.config.debug.showsEntityHitboxes) {
		const hitboxDimensions: TDimensions = {
			w: hitboxComponent.body.width,
			h: hitboxComponent.body.height,
		};
		setHitboxBorder(hitboxViewComponent, "characters.player", hitboxDimensions, initialCoordinates);
	}

	velocityComponent.actionVelocities = {
		"running": PLAYER_RUNNING_SPEED,
	};

	actionComponent.availableActions = ["standing", "running", "attacking"];
	actionComponent.currentAction = "standing";

	createEntity(
		"player",
		[
			userComponent,
			keyboardComponent,
			locationComponent,
			directionComponent,
			viewComponent,
			velocityComponent,
			actionComponent,
			hitboxComponent,
			hitboxViewComponent,
		],
	);
};