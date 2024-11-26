import { CAction } from "@root/app/common/components/action/action.component";
import { CDirection } from "@root/app/common/components/direction/direction.component";
import { CKeyboard } from "@root/app/common/components/keyboard/keyboard.component";
import { AVAILABLE_ACTIONS } from "@root/app/common/constants/availableActions.constants";
import { DIRECTION8_ANGLES } from "@root/app/common/constants/space.constants";
import { Entity } from "@root/app/common/entities/entity.models";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { translateInputs } from "@root/app/core/systems/translateInputs/translateInputs.system";
import { createMuddyBuddy } from "@root/app/domains/muddyBuddy/utils/createMuddyBuddy";
import { createPlayer } from "@root/app/domains/player/utils/createPlayer";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("translateInputs", async () => {
	await assetsManager.loadAssets();

	const a = Object.entries({
		player:     createPlayer,
		muddyBuddy: createMuddyBuddy,
	});
	for (let i = 0; i < a.length; i++) {
		const entry = a[i];
		const entityName = entry[0] as string;
		const createEntity = entry[1];
		let entity: Entity;
		let actionComponent: CAction;
		let directionComponent: CDirection;
		let keyboardComponent: CKeyboard;

		beforeEach(() => {
			entity = createEntity({ x: 0, y: 0 });
			actionComponent = entity.getComponent(CAction);
			directionComponent = entity.getComponent(CDirection);
			keyboardComponent = entity.getComponent(CKeyboard);

			actionComponent.currentAction = "standing";
			directionComponent.direction = 90;
		});

		afterEach(() => {
			entity.destroy();
		});

		// standing

		if (AVAILABLE_ACTIONS[entityName].includes("standing")) {
			describe(`${entityName}: standing`, () => {
				test("Initial action: standing. The character keeps standing", () => {
					translateInputs();
					expect(actionComponent.currentAction).toBe("standing");
					expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
				});

				if (AVAILABLE_ACTIONS[entityName].includes("running")) {
					test("Initial action: running. The character starts standing", () => {
						actionComponent.currentAction = "running";
						translateInputs();
						expect(actionComponent.currentAction).toBe("standing");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("rolling")) {
					test("Initial action: rolling. The character starts standing", () => {
						actionComponent.currentAction = "rolling";
						translateInputs();
						expect(actionComponent.currentAction).toBe("standing");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("attacking")) {
					test("Initial action: attacking. The character do not start standing", () => {
						actionComponent.currentAction = "attacking";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("dying")) {
					test("Initial action: dying. The character do not start standing", () => {
						actionComponent.currentAction = "dying";
						translateInputs();
						expect(actionComponent.currentAction).toBe("dying");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("beingDead")) {
					test("Initial action: beingDead. The character do not start standing", () => {
						actionComponent.currentAction = "beingDead";
						translateInputs();
						expect(actionComponent.currentAction).toBe("beingDead");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}
			});
		}

		// running

		if (AVAILABLE_ACTIONS[entityName].includes("running")) {
			describe(`${entityName}: running`, () => {
				beforeEach(() => {
					keyboardComponent.keyboard = { KeyW: true };
				});

				test("Initial action: standing. The character starts running", () => {
					translateInputs();
					expect(actionComponent.currentAction).toBe("running");
					expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
				});

				if (AVAILABLE_ACTIONS[entityName].includes("running")) {
					test("Initial action: running. The character keeps running", () => {
						actionComponent.currentAction = "running";
						translateInputs();
						expect(actionComponent.currentAction).toBe("running");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("rolling")) {
					test("Initial action: rolling. The character starts running", () => {
						actionComponent.currentAction = "rolling";
						translateInputs();
						expect(actionComponent.currentAction).toBe("running");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("attacking")) {
					test("Initial action: attacking. The character do not start running", () => {
						actionComponent.currentAction = "attacking";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("dying")) {
					test("Initial action: dying. The character do not start running", () => {
						actionComponent.currentAction = "dying";
						translateInputs();
						expect(actionComponent.currentAction).toBe("dying");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("beingDead")) {
					test("Initial action: beingDead. The character do not start running", () => {
						actionComponent.currentAction = "beingDead";
						translateInputs();
						expect(actionComponent.currentAction).toBe("beingDead");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}
			});
		}

		// rolling

		if (AVAILABLE_ACTIONS[entityName].includes("rolling")) {
			describe(`${entityName}: rolling`, () => {
				beforeEach(() => {
					keyboardComponent.keyboard = { KeyW: true };
				});

				test("Initial action: standing. The character starts rolling", () => {
					translateInputs();
					expect(actionComponent.currentAction).toBe("rolling");
					expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
				});

				if (AVAILABLE_ACTIONS[entityName].includes("running")) {
					test("Initial action: running. The character starts rolling", () => {
						actionComponent.currentAction = "running";
						translateInputs();
						expect(actionComponent.currentAction).toBe("rolling");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("rolling")) {
					test("Initial action: rolling. The character keeps rolling", () => {
						actionComponent.currentAction = "rolling";
						translateInputs();
						expect(actionComponent.currentAction).toBe("rolling");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("attacking")) {
					test("Initial action: attacking. The character do not start rolling", () => {
						actionComponent.currentAction = "attacking";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("dying")) {
					test("Initial action: dying. The character do not start rolling", () => {
						actionComponent.currentAction = "dying";
						translateInputs();
						expect(actionComponent.currentAction).toBe("dying");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("beingDead")) {
					test("Initial action: beingDead. The character do not start rolling", () => {
						actionComponent.currentAction = "beingDead";
						translateInputs();
						expect(actionComponent.currentAction).toBe("beingDead");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}
			});
		}

		// attacking

		if (AVAILABLE_ACTIONS[entityName].includes("attacking")) {
			describe(`${entityName}: attacking`, () => {
				beforeEach(() => {
					keyboardComponent.keyboard = { Comma: true };
				});

				test("Initial action: standing. The character starts attacking", () => {
					translateInputs();
					expect(actionComponent.currentAction).toBe("attacking");
					expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
				});

				if (AVAILABLE_ACTIONS[entityName].includes("running")) {
					test("Initial action: running. The character starts attacking", () => {
						actionComponent.currentAction = "running";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});

					test("Initial action: running. The character starts attacking, in a different direction", () => {
						actionComponent.currentAction = "running";
						keyboardComponent.keyboard.KeyW = true;
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("rolling")) {
					test("Initial action: rolling. The character starts attacking", () => {
						actionComponent.currentAction = "rolling";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});

					test("Initial action: rolling. The character starts attacking, in a different direction", () => {
						actionComponent.currentAction = "rolling";
						keyboardComponent.keyboard.KeyW = true;
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.up);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("attacking")) {
					test("Initial action: attacking. The character keeps attacking", () => {
						actionComponent.currentAction = "attacking";
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});

					test("Initial action: attacking. The character keeps attacking, in the same direction", () => {
						actionComponent.currentAction = "attacking";
						keyboardComponent.keyboard.KeyW = true;
						translateInputs();
						expect(actionComponent.currentAction).toBe("attacking");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("dying")) {
					test("Initial action: dying. The character do not start attacking", () => {
						actionComponent.currentAction = "dying";
						translateInputs();
						expect(actionComponent.currentAction).toBe("dying");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}

				if (AVAILABLE_ACTIONS[entityName].includes("beingDead")) {
					test("Initial action: beingDead. The character do not start attacking", () => {
						actionComponent.currentAction = "beingDead";
						translateInputs();
						expect(actionComponent.currentAction).toBe("beingDead");
						expect(directionComponent.direction).toBe(DIRECTION8_ANGLES.down);
					});
				}
			});
		}
	}
});