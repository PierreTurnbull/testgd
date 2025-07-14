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
			class={`
				h-full
				aspect-square
				rounded
				bg-amber-900
				hover:bg-amber-700
				border
				border-amber-400
				flex
				justify-center
				items-center
				cursor-pointer
			`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};