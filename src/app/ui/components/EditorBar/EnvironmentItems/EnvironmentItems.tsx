import { useState } from "preact/hooks";
import { useClosingContext } from "../../../contexts/closing/useClosingContext";
import { uiBus } from "../../../utils/uiBus/uiBus.singleton";
import { MenuItems } from "../../common/MenuItems/MenuItems";
import { EnvironmentItemVariants } from "../EnvironmentItemVariants/Variants/EnvironmentItemVariants";
import { EnvironmentItem } from "./EnvironmentItem/EnvironmentItem";

const AVAILABLE_ITEMS = [
	"rockLG",
	"rockMD",
];

type TEnvironmentItemsProps = {
	close: () => void
}

export const EnvironmentItems = ({
	close,
}: TEnvironmentItemsProps) => {
	const [selectedItem, setSelectedItem] = useState<typeof AVAILABLE_ITEMS[number] | null>(null);

	useClosingContext("environmentItems", close);

	const renderEnvironmentItems = () => {
		return AVAILABLE_ITEMS.map(availableItem => {
			return (
				<EnvironmentItem
					key={availableItem}
					openEnvironmentItemMenu={() => {
						uiBus.emit("interactWithEditorBar");
						setSelectedItem(availableItem);
					}}
					name={availableItem}
				/>
			);
		});
	};

	const renderEnvironmentItemVariants = () => {
		return (
			selectedItem
				? (
					<EnvironmentItemVariants
						name={selectedItem}
						close={() => setSelectedItem(null)}
					/>
				)
				: null
		);
	};

	return (
		<MenuItems>
			<div class="flex space-x-2">
				{renderEnvironmentItems()}
			</div>
			{renderEnvironmentItemVariants()}
		</MenuItems>
	);
};