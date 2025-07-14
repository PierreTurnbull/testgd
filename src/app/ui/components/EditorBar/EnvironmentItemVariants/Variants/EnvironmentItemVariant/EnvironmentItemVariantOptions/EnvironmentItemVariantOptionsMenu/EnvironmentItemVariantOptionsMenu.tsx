import { IconButton } from "@root/app/ui/components/common/IconButton/IconButton";
import { Fragment } from "preact";
import { useState } from "preact/hooks";
import { CenterEditor } from "./CenterEditor/CenterEditor";

type TEnvironmentItemVariantOptionsMenuProps = {
	name:    string
	variant: number
	isOpen:  boolean
}

export const EnvironmentItemVariantOptionsMenu = ({
	name,
	variant,
	isOpen,
}: TEnvironmentItemVariantOptionsMenuProps) => {
	const [centerEditorIsOpen, setCenterEditorIsOpen] = useState(false);

	return (
		<Fragment>
			{
				isOpen
					// half transparent background to prevent interacting with the parent button
					? <div class="absolute top-0 right-0 bottom-0 left-0 rounded bg-amber-400 opacity-50 z-10" />
					: null
			}
			{
				isOpen
					? (
						<div class="absolute top-2 left-2 z-20">
							<IconButton
								icon="·"
								onClick={async _ => {
									setCenterEditorIsOpen(prev => !prev);
								}}
								size="sm"
							/>
						</div>
					)
					: null
			}
			{
				centerEditorIsOpen
					? (
						<CenterEditor
							close={() => setCenterEditorIsOpen(false)}
							name={name}
							variant={variant}
						/>
					)
					: null
			}
		</Fragment>
	);
};