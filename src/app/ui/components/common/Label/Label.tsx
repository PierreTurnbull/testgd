import { Text } from "../Text/Text";

type TLabelProps = {
	name:     string
	children: string
	onClick:  () => void
}

export const Label = ({
	name,
	children,
	onClick,
}: TLabelProps) => {
	return (
		<label
			class={`
				cursor-pointer
			`}
			for={name}
			onClick={onClick}
		>
			<Text>
				{children}
			</Text>
		</label>
	);
};