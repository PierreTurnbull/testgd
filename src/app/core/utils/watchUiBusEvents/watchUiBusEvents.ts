import { clearDraggedEntity } from "@root/app/domains/editor/utils/clearDraggedEntity/clearDraggedEntity";
import { createEntity } from "@root/app/domains/editor/utils/createEntity/createEntity";
import { dragEntity } from "@root/app/domains/editor/utils/dragEntity/dragEntity";
import { unselectEntity } from "@root/app/domains/editor/utils/unselectEntity/unselectEntity";
import { uiBus } from "../../../ui/utils/uiBus/uiBus.singleton";

export const watchUiBusEvents = () => {
	uiBus.subscribe(
		"selectEnvironmentItemVariant",
		(payload) => {
			clearDraggedEntity();
			unselectEntity();

			const { name, variant } = payload as { name: string, variant: number };
			const entity = createEntity(name, variant, "down");
			dragEntity(entity);
		},
	);

	uiBus.subscribe(
		"interactWithEditorBar",
		() => {
			unselectEntity();
		},
	);
};