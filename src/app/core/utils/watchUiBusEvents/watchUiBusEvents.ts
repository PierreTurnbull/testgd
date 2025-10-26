import { createEntity } from "@root/app/features/editor/utils/createEntity/createEntity";
import { startDraggingEntity } from "@root/app/features/editor/utils/startDraggingEntity/startDraggingEntity";
import { stopDraggingEntity } from "@root/app/features/editor/utils/stopDraggingEntity/stopDraggingEntity";
import { unselectEntity } from "@root/app/features/editor/utils/unselectEntity/unselectEntity";
import { uiBus } from "../../../ui/utils/uiBus/uiBus.singleton";

export const watchUiBusEvents = () => {
	uiBus.subscribe(
		"selectEnvironmentItemVariant",
		(payload) => {
			stopDraggingEntity();
			unselectEntity();

			const { name, variant } = payload as { name: string, variant: number };
			const entity = createEntity(name, variant, "down");
			startDraggingEntity(entity);
		},
	);

	uiBus.subscribe(
		"interactWithEditorBar",
		() => {
			stopDraggingEntity();
			unselectEntity();
		},
	);

	uiBus.subscribe(
		"escape",
		() => {
			stopDraggingEntity();
			unselectEntity();
		},
	);
};