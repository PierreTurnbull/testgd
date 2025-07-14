import { IconButton } from "@root/app/ui/components/common/IconButton/IconButton";
import { useState } from "preact/hooks";
import { EnvironmentItemVariantOptionsMenu } from "./EnvironmentItemVariantOptionsMenu/EnvironmentItemVariantOptionsMenu";

type TEnvironmentItemVariantOptionsProps = {
	name:    string
	variant: number
}

/**
 * afdsfdf
 * @param param0 a
 * @returns 
 */
export const EnvironmentItemVariantOptions = ({
	name,
	variant,
}: TEnvironmentItemVariantOptionsProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<div class="absolute bottom-2 right-2 z-20">
				<IconButton
					icon={isOpen ? "✖" : "⚙"}
					onClick={async _ => {
						setIsOpen(prev => !prev);
					}}
					size="sm"
				/>
			</div>
			<EnvironmentItemVariantOptionsMenu
				name={name}
				variant={variant}
				isOpen={isOpen}
			/>
		</div>
	);
};