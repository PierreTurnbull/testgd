type TIconButtonSize = "sm" | "md"

type TIconButtonProps = {
	icon:    string
	onClick: (event: MouseEvent) => void
	size?:   TIconButtonSize
};

export const IconButton = ({
	icon,
	onClick,
	size = "md",
}: TIconButtonProps) => {
	const textSizeClasses: Record<TIconButtonSize, string> = {
		sm: "xl",
		md: "2xl",
	};
	const buttonSizeClasses: Record<TIconButtonSize, string> = {
		sm: "h-4 w-4",
		md: "h-8 w-8",
	};

	return (
		<button
			className={`
				${buttonSizeClasses[size]}
				bg-amber-900
				hover:bg-amber-700
				border
				border-amber-400
				rounded
				text-amber-400
				${textSizeClasses[size]}
				flex
				justify-center
				items-center
				cursor-pointer
			`}
			onClick={onClick}
		>
			{icon}
		</button>
	);
};