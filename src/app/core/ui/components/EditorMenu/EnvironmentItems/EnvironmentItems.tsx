import { useState } from "preact/hooks";
import { MenuItems } from "../../common/MenuItems/MenuItems";
import { EnvironmentItem } from "./EnvironmentItem/EnvironmentItem";
import { EnvironmentItemMenu } from "./EnvironmentItemMenu/EnvironmentItemMenu";

const AVAILABLE_ITEMS = [
	"rockLG",
	"rockMD",
];

export const EnvironmentItems = () => {
	const [selectedItem, setSelectedItem] = useState<typeof AVAILABLE_ITEMS[number] | null>(null);

	const renderEnvironmentItems = () => {
		return AVAILABLE_ITEMS.map(availableItem => {
			return (
				<EnvironmentItem
					key={availableItem}
					openEnvironmentItemMenu={() => setSelectedItem(availableItem)}
					name={availableItem}
				/>
			);
		});
	};

	const renderEnvironmentItemMenu = () => {
		return (
			selectedItem
				? (
					<EnvironmentItemMenu
						name={selectedItem}
					/>
				)
				: null
		);
	};

	return (
		<MenuItems>
			{renderEnvironmentItems()}
			{renderEnvironmentItemMenu()}
		</MenuItems>
	);
};