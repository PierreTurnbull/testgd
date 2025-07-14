import { IconButton } from "@root/app/ui/components/common/IconButton/IconButton";
import { EnvironmentItemVariantOptionsMenu } from "./EnvironmentItemVariantOptionsMenu/EnvironmentItemVariantOptionsMenu";

type TEnvironmentItemVariantOptionsProps = {
	name:                 string
	variant:              number
	optionsMenuIsOpen:    boolean
	setOptionsMenuIsOpen: (value: boolean) => void
}

export const EnvironmentItemVariantOptions = ({
	name,
	variant,
	optionsMenuIsOpen,
	setOptionsMenuIsOpen,
}: TEnvironmentItemVariantOptionsProps) => {
	return (
		<div>
			<div class="absolute bottom-2 right-2 z-20">
				<IconButton
					icon={optionsMenuIsOpen ? "✖" : "⚙"}
					onClick={async _ => {
						setOptionsMenuIsOpen(!optionsMenuIsOpen);
					}}
					size="sm"
				/>
			</div>
			<EnvironmentItemVariantOptionsMenu
				name={name}
				variant={variant}
				isOpen={optionsMenuIsOpen}
			/>
		</div>
	);
};