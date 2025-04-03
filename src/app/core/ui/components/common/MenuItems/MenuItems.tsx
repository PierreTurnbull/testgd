import { ReactNode } from "preact/compat";

type TMenuItemsProps = {
	children: ReactNode
}

export const MenuItems = ({
	children,
}: TMenuItemsProps) => {
	return (
		<div class="flex">
			{children}
		</div>
	);
};