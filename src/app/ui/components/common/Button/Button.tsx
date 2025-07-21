import { ReactNode } from "preact/compat";

type TButtonProps = {
	onClick:  (event: MouseEvent) => void
	children: ReactNode
}

export const Button = ({
	onClick,
	children,
}: TButtonProps) => {
	return (
		<button
			class={`
				block
				px-4
				py-2
				bg-amber-900
				border
				border-amber-400
				text-amber-400
				rounded
				leading-none
				hover:bg-amber-700
				cursor-pointer
			`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};