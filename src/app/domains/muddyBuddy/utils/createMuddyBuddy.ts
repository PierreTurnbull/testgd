import { setAnimatedSprite } from "@root/app/common/animatedSprites/utils/animatedSprite/setAnimatedSprite";
import { setAnimatedSpriteBorder } from "@root/app/common/animatedSprites/utils/animatedSpriteBorder/setAnimatedSpriteBorder";
import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { CLocation } from "@root/app/common/components/location/location.component";
import { CMuddyBuddy } from "@root/app/common/components/muddyBuddy/muddyBuddy.component";
import { CVelocity } from "@root/app/common/components/velocity/velocity.component";
import { CView } from "@root/app/common/components/view/view.entity";
import { createEntity } from "@root/app/common/entities/utils/createEntity";
import { animatedSpritesManager } from "@root/app/core/animatedSpritesManager/animatedSpritesManager.singletons";
import { configManager } from "@root/app/core/configManager/configManager.singletons";
import { MUDDYBUDDY_ROLLING_SPEED } from "@root/app/domains/muddyBuddy/constants/muddyBuddy.constants";

export const createMuddyBuddy = () => {
	const muddyBuddyComponent = new CMuddyBuddy();
	const keyboardComponent = new CKeyboard();
	const locationComponent = new CLocation();
	const directionComponent = new CDirection();
	const viewComponent = new CView();
	const velocityComponent = new CVelocity();
	const actionComponent = new CAction();
	
	const initialCoordinates = {
		x: 300,
		y: 300, 
	};
	locationComponent.coordinates = initialCoordinates;
	const initialAnimatedSprite = animatedSpritesManager.animatedSprites["characters.muddyBuddy.standing.down"];
	setAnimatedSprite(viewComponent, initialAnimatedSprite, initialCoordinates);
	if (configManager.config.debug.showsEntityBorders) {
		setAnimatedSpriteBorder(viewComponent, initialCoordinates);
	}
	velocityComponent.actionVelocities = {
		"rolling": MUDDYBUDDY_ROLLING_SPEED,
	};
	actionComponent.availableActions = ["standing", "rolling"];
	actionComponent.currentAction = "standing";

	createEntity(
		"muddyBuddy",
		[
			muddyBuddyComponent,
			keyboardComponent,
			locationComponent,
			directionComponent,
			viewComponent,
			velocityComponent,
			actionComponent,
		],
	);
};