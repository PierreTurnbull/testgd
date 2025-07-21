type TTitleProps = {
	children: string
}

export const Title = ({
	children,
}: TTitleProps) => {
	return (
		<h2 class="text-amber-400 text-2xl">
			{children}
		</h2>
	);
};