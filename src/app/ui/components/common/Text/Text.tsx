type TTextProps = {
	children: string
}

export const Text = ({
	children,
}: TTextProps) => {
	return (
		<p class="text-amber-400 leading-none">
			{children}
		</p>
	);
};