import { clearDraggedEntity } from "@root/app/domains/editor/utils/clearDraggedEntity/clearDraggedEntity";
import { clearSelectedEntity } from "@root/app/domains/editor/utils/clearSelectedEntity/clearSelectedEntity";
import { createEntity } from "@root/app/domains/editor/utils/createEntity/createEntity";
import { dragEntity } from "@root/app/domains/editor/utils/dragEntity/dragEntity";
import { uiBus } from "../../../ui/utils/uiBus/uiBus.singleton";

export const watchUiBusEvents = () => {
	uiBus.subscribe(
		"selectEnvironmentItemVariant",
		(payload) => {
			clearDraggedEntity();
			clearSelectedEntity();

			const { name, variant } = payload as { name: string, variant: number };
			const entity = createEntity(name, variant, "down");
			dragEntity(entity);
		},
	);

	uiBus.subscribe(
		"interactWithEditorBar",
		() => {
			clearSelectedEntity();
		},
	);
};