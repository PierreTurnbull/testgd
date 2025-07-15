import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { DIRECTIONS8 } from "@root/app/common/constants/space.constants";
import { IconButton } from "@root/app/ui/components/common/IconButton/IconButton";
import { Dispatch, StateUpdater } from "preact/hooks";

type TButtonsProps = {
	submit:       () => void
	close:        () => void
	reset?:       () => void
	undo?:        () => void
	setDirection: Dispatch<StateUpdater<TDirection8>>
}

export const EditorButtons = ({
	submit: onSubmit,
	close,
	reset,
	undo,
	setDirection,
}: TButtonsProps) => {
	return (
		<div class="flex space-x-2">
			<IconButton
				icon="<"
				onClick={async _ => {
					setDirection(prev => {
						const prevIndex = DIRECTIONS8.indexOf(prev);
		
						const nextIndex = prevIndex === 0 ? DIRECTIONS8.length - 1 : prevIndex - 1;
		
						return DIRECTIONS8[nextIndex];
					});
				}}
			/>
			<IconButton
				icon="✓"
				onClick={onSubmit}
			/>
			{
				reset
					? (
						<IconButton
							icon="↻"
							onClick={reset}
						/>
					)
					: null
			}
			{
				undo
					? (
						<IconButton
							icon="←"
							onClick={undo}
						/>
					)
					: null
			}
			<IconButton
				icon="✖"
				onClick={async _ => {
					close();
				}}
			/>
			<IconButton
				icon=">"
				onClick={async _ => {
					setDirection(prev => {
						const prevIndex = DIRECTIONS8.indexOf(prev);
		
						const nextIndex = prevIndex === DIRECTIONS8.length - 1 ? 0 : prevIndex + 1;
		
						return DIRECTIONS8[nextIndex];
					});
				}}
			/>
		</div>
	);
};