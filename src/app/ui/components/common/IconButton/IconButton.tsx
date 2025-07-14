type TIconButtonProps = {
	icon:    string
	onClick: () => void
};

export const IconButton = ({
	icon,
	onClick,
}: TIconButtonProps) => {
	return (
		<button
			className={`
				h-8
				w-8
				bg-amber-900
				hover:bg-amber-700
				rounded
				text-amber-400
				text-2xl
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