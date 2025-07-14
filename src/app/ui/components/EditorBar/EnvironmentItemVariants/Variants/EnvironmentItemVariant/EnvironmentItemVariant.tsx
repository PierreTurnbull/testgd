import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { MenuItem } from "@root/app/ui/components/common/MenuItem/MenuItem";
import { uiBus } from "@root/app/ui/utils/uiBus/uiBus.singleton";
import { useEffect, useState } from "preact/hooks";

type TEnvironmentItemVariantProps = {
	name:    string
	variant: number
}

export const EnvironmentItemVariant = ({
	name,
	variant,
}: TEnvironmentItemVariantProps) => {
	const [isDraggingItem, setIsDraggingItem] = useState(false);

	useEffect(() => {
		uiBus.subscribe("interactWithEditorBar", () => {
			setIsDraggingItem(false);
		});
		uiBus.subscribe("stopDraggingEntity", () => {
			setIsDraggingItem(false);
		});
		uiBus.subscribe("startDraggingEntity", (payload) => {
			const {
				name: draggedEntityName,
				variant: draggedEntityVariant,
			} = payload as { name: string, variant: number };

			if (draggedEntityName === name && draggedEntityVariant === variant) {
				setIsDraggingItem(true);
			}
		});
	}, []);

	return (
		<MenuItem
			onClick={() => {
				uiBus.emit("interactWithEditorBar");

				if (isDraggingItem) {
					setIsDraggingItem(false);
				} else {
					uiBus.emit("selectEnvironmentItemVariant", {
						payload: {
							name:    name,
							variant: variant,
						},
					});
					setIsDraggingItem(true);
				}
			}}
		>
			{
				isDraggingItem
					? <p class="text-amber-400 text-4xl">✖</p>
					: (
						<img
							src={assetsManager.textures[`environment.${name}.${variant}.down`].label}
							class="h-full"
						/>
					)
			}
		</MenuItem>
	);
};