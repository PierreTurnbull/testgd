import { ReactNode } from "preact/compat";

type TMenuItemProps = {
	children: ReactNode
	onClick:  (event: MouseEvent) => void
}

export const MenuItem = ({
	children,
	onClick,
}: TMenuItemProps) => {
	return (
		<div
			class="h-full aspect-square border-2 border-amber-950 hover:bg-amber-800 flex justify-center items-center"
			onClick={onClick}
		>
			{children}
		</div>
	);
};