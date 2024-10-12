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
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { PLAYER_RUNNING_SPEED } from "@root/app/domains/player/constants/player.constants";

export const createPlayer = () => {
	const userComponent = new CUser();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	const hitboxComponent = new CHitbox();
	const hitboxViewComponent = new CHitboxView();
	
	const initialCoordinates = {
		x: 300,
		y: 300, 
	};
	locationComponent.coordinates = initialCoordinates;
	hitboxComponent.dimensions = HITBOX_BOUNDS["characters.player"];
	setAnimatedSprite(viewComponent, "characters.player.standing.down", initialCoordinates);
	if (configManager.config.debug.showsEntityBorders) {
		setBorder(viewComponent, initialCoordinates);
	}
	if (configManager.config.debug.showsEntityHitboxes) {
		setHitboxBorder(hitboxViewComponent, "characters.player", hitboxComponent.dimensions, initialCoordinates);
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