import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { Modal } from "@root/app/ui/components/common/Modal/Modal";
import { useEffect, useState } from "preact/hooks";
import { EditorButtons } from "../common/EditorButtons/EditorButtons";
import { CenterEditorItem } from "./CenterEditorItem/CenterEditorItem";

type TCenterEditorProps = {
	close:   () => void
	name:    string
	variant: number
}

export const CenterEditor = ({
	close,
	name,
	variant,
}: TCenterEditorProps) => {
	const [direction, setDirection] = useState<TDirection8>("up");
	const [centers, setCenters] = useState<Record<TDirection8, TCoordinates>>({
		up:        { x: 0, y: 0 },
		upRight:   { x: 0, y: 0 },
		right:     { x: 0, y: 0 },
		downRight: { x: 0, y: 0 },
		down:      { x: 0, y: 0 },
		downLeft:  { x: 0, y: 0 },
		left:      { x: 0, y: 0 },
		upLeft:    { x: 0, y: 0 },
	});
	
	useEffect(() => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		setCenters({
			up:        gameEditorStore.data.config.environment[name][variant].up.center,
			upRight:   gameEditorStore.data.config.environment[name][variant].upRight.center,
			right:     gameEditorStore.data.config.environment[name][variant].right.center,
			downRight: gameEditorStore.data.config.environment[name][variant].downRight.center,
			down:      gameEditorStore.data.config.environment[name][variant].down.center,
			downLeft:  gameEditorStore.data.config.environment[name][variant].downLeft.center,
			left:      gameEditorStore.data.config.environment[name][variant].left.center,
			upLeft:    gameEditorStore.data.config.environment[name][variant].upLeft.center,
		});
	}, []);

	return (
		<Modal
			close={close}
		>
			<div class="flex flex-col space-y-4 items-center">
				<p class="text-amber-400">{name}.{variant}.{direction}</p>
				<CenterEditorItem
					name={name}
					variant={variant}
					direction={direction}
					center={centers[direction]}
					setCenter={(center: TCoordinates) => setCenters(prev => {
						return {
							...prev,
							[direction]: center,
						};
					})}
				/>
				<EditorButtons
					submit={async () => {
						Object.entries(centers).forEach(entry => {
							gameEditorStore!.data.config.environment[name][variant][entry[0] as TDirection8].center = entry[1];
						});
						close();
					}}
					close={close}
					setDirection={setDirection}
				/>
			</div>
		</Modal>
	);
};