import { createEntity } from "@root/app/domains/editor/utils/createEntity/createEntity";
import { startDraggingEntity } from "@root/app/domains/editor/utils/startDraggingEntity/startDraggingEntity";
import { stopDraggingEntity } from "@root/app/domains/editor/utils/stopDraggingEntity/stopDraggingEntity";
import { unselectEntity } from "@root/app/domains/editor/utils/unselectEntity/unselectEntity";
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
};