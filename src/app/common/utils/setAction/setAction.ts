import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CView } from "@root/app/common/components/view/view.component";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { CHitbox } from "@root/app/domains/hitbox/components/hitbox/hitbox.component";
import { CHitboxIsActive } from "@root/app/domains/hitbox/components/hitboxIsActive/hitboxIsActive.component";
import { CHitboxPoints } from "@root/app/domains/hitbox/components/hitboxPoints/hitboxPoints.component";
import { CHitboxView } from "@root/app/domains/hitbox/components/hitboxView/hitboxView.component";
import { HITBOX_BOUNDS } from "@root/app/domains/hitbox/constants/hitboxes.constants";
import { getHitboxBorderView } from "@root/app/domains/hitbox/utils/getHitboxBorderView/getHitboxBorderView";
import { getBorderView } from "@root/app/domains/view/utils/common/getBorderView/getBorderView";
import { getCenterView } from "@root/app/domains/view/utils/common/getCenterView/getCenterView";
import { createView } from "@root/app/domains/view/utils/create/createView/createView";
import { getAnimatedSprite } from "@root/app/domains/view/utils/getAnimatedSprite/getAnimatedSprite";
import { removeView } from "@root/app/domains/view/utils/remove/removeView/removeView";
import { CViewSortingCurveView } from "@root/app/domains/viewSortingCurve/components/viewSortingCurveView/viewSortingCurveView.component";
import { getViewSortingCurveView } from "@root/app/domains/viewSortingCurve/utils/getViewSortingCurveView/getViewSortingCurveView";
import { AnimatedSprite } from "pixi.js";
import { Entity } from "../../../domains/entity/entity.models";
import { CBorderView } from "../../components/borderView/borderView.component";
import { CCenterView } from "../../components/centerView/centerView.component";
import { ANGLE_NAMES } from "../../constants/space.constants";
import { TPoint } from "../../types/point.type";

type TOptions = {
	onLoop?:        AnimatedSprite["onLoop"] | null,
	onComplete?:    AnimatedSprite["onComplete"] | null,
	onFrameChange?: ((currentFrame: number, clear?: () => void) => void) | null,
}

export const setAction = (
	actorEntity: Entity,
	action: CAction["currentAction"],
	direction: CDirection["direction"],
	options: TOptions = {},
) => {
	const actionComponent = actorEntity.getComponent(CAction);
	const directionComponent = actorEntity.getComponent(CDirection);
	const viewComponent = actorEntity.getComponent(CView);

	const viewMustBeUpdated = actionComponent.currentAction !== action || directionComponent.direction8 !== ANGLE_NAMES.get(direction);

	directionComponent.direction = direction;
	actionComponent.currentAction = action;

	if (viewMustBeUpdated) {
		// prevent the current animation from continuing after being changed, triggering events such as onComplete or onFrameChange
		viewComponent.view.stop();

		removeView(actorEntity, CView, "view");
		createView(actorEntity, CView, getAnimatedSprite, "view");
		if (configManager.config.debug.showsEntityBorders) {
			removeView(actorEntity, CBorderView, "borderView");
			createView(actorEntity, CBorderView, getBorderView, "borderView");
		}
		if (configManager.config.debug.showsEntityCenters) {
			removeView(actorEntity, CCenterView, "centerView");
			createView(actorEntity, CCenterView, getCenterView, "centerView");
		}
		if (configManager.config.debug.showsViewSortingCurves) {
			removeView(actorEntity, CViewSortingCurveView, "viewSortingCurveView");
			createView(actorEntity, CViewSortingCurveView, getViewSortingCurveView, "viewSortingCurveView");
		}

		if (configManager.config.debug.showsEntityHitboxes && actorEntity.relations.has("hitboxes")) {
			const hitboxEntities = actorEntity.getRelatedEntities("hitboxes");

			hitboxEntities
				.filter(hitboxEntity => hitboxEntity.getComponent(CHitbox).type === "motion")
				.forEach((hitboxEntity) => {
					const hitboxComponent = hitboxEntity.getComponent(CHitbox);
					const hitboxPointsComponent = hitboxEntity.getComponent(CHitboxPoints);

					const hitboxBounds = HITBOX_BOUNDS[hitboxComponent.name];
					if (!hitboxBounds) {
						throw new Error(`Missing bounds for hitbox "${hitboxComponent.name}".`);
					}

					const hitboxPoints: TPoint[] = [
						{
							x: 0,
							y: 0,
						},
						{
							x: hitboxBounds.w,
							y: 0,
						},
						{
							x: hitboxBounds.w,
							y: hitboxBounds.h,
						},
						{
							x: 0,
							y: hitboxBounds.h,
						},
					];

					hitboxPointsComponent.hitboxPoints = hitboxPoints;

					removeView(hitboxEntity, CHitboxView, "hitboxBorderView");
					createView(hitboxEntity, CHitboxView, getHitboxBorderView, "hitboxBorderView");
				});
		}

		if (actorEntity.name === "muddyBuddy") {
			const hitboxEntities = actorEntity.getRelatedEntities("hitboxes");

			const damageHitboxEntity = hitboxEntities.find(hitboxEntity => {
				const hitboxComponent = hitboxEntity.getComponent(CHitbox);

				return hitboxComponent.type === "damage";
			});

			if (!damageHitboxEntity) {
				throw new Error("Missing damage hitbox.");
			}

			const hitboxIsActiveComponent = damageHitboxEntity.getComponent(CHitboxIsActive);

			hitboxIsActiveComponent.hitboxIsActive = action === "rolling";
		}
	}

	if (options.onLoop) {
		viewComponent.view.onLoop = options.onLoop;
	}
	if (options.onComplete) {
		viewComponent.view.onComplete = options.onComplete;
	}
	if (options.onFrameChange) {
		viewComponent.view.onFrameChange = (currentFrame: number) => {
			if (!options.onFrameChange) throw new Error("Options were altered since setting up the action.");
			const clear = () => {
				viewComponent.view.onFrameChange = undefined;
			};
			options.onFrameChange(
				currentFrame,
				clear,
			);
		};
	}
};