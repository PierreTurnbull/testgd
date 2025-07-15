import { TDirection8 } from "@root/app/common/components/direction/types/direction.types";
import { TCoordinates } from "@root/app/common/types/coordinates.types";
import { TPoint } from "@root/app/common/types/point.type";
import { gameEditorStore } from "@root/app/domains/editor/store/store";
import { Modal } from "@root/app/ui/components/common/Modal/Modal";
import { useEffect, useState } from "preact/hooks";
import { EditorButtons } from "../common/EditorButtons/EditorButtons";
import { HitboxPointsEditorItem } from "./HitboxPointsEditorItem/HitboxPointsEditorItem";

type THitboxPointsEditorProps = {
	close:   () => void
	name:    string
	variant: number
}

export const HitboxPointsEditor = ({
	close,
	name,
	variant,
}: THitboxPointsEditorProps) => {
	const [direction, setDirection] = useState<TDirection8>("up");
	const [hitboxPoints, setHitboxPoints] = useState<Record<TDirection8, TPoint[]>>({
		up:        [],
		upRight:   [],
		right:     [],
		downRight: [],
		down:      [],
		downLeft:  [],
		left:      [],
		upLeft:    [],
	});
		
	useEffect(() => {
		if (!gameEditorStore) {
			throw new Error("Game editor store is not initialized.");
		}

		setHitboxPoints(structuredClone({
			up:        gameEditorStore.data.config.environment[name][variant].up.hitboxPoints,
			upRight:   gameEditorStore.data.config.environment[name][variant].upRight.hitboxPoints,
			right:     gameEditorStore.data.config.environment[name][variant].right.hitboxPoints,
			downRight: gameEditorStore.data.config.environment[name][variant].downRight.hitboxPoints,
			down:      gameEditorStore.data.config.environment[name][variant].down.hitboxPoints,
			downLeft:  gameEditorStore.data.config.environment[name][variant].downLeft.hitboxPoints,
			left:      gameEditorStore.data.config.environment[name][variant].left.hitboxPoints,
			upLeft:    gameEditorStore.data.config.environment[name][variant].upLeft.hitboxPoints,
		}));
	}, []);

	const reset = () => {
		setHitboxPoints(prev => {
			const nextHitboxPoints = structuredClone(prev);

			nextHitboxPoints[direction] = [];

			return nextHitboxPoints;
		});
	};

	const undo = () => {
		setHitboxPoints(prev => {
			const nextHitboxPoints = structuredClone(prev);

			nextHitboxPoints[direction] = nextHitboxPoints[direction].slice(0, -1);

			return nextHitboxPoints;
		});
	};

	return (
		<Modal
			close={close}
		>
			<div class="flex flex-col space-y-4 items-center">
				<p class="text-amber-400">{name}.{variant}.{direction}</p>
				<HitboxPointsEditorItem
					name={name}
					variant={variant}
					direction={direction}
					hitboxPoints={hitboxPoints[direction]}
					appendHitboxPoint={(hitboxPoint: TPoint) => {
						setHitboxPoints(prev => {
							const nextHitboxPoints = structuredClone(prev[direction]);

							nextHitboxPoints.push(hitboxPoint);

							return {
								...prev,
								[direction]: nextHitboxPoints,
							};
						});
					}}
					updateHitboxPoint={(key: number, hitboxPoint: TPoint) => {
						setHitboxPoints(prev => {
							const nextHitboxPoints = structuredClone(prev[direction]);

							nextHitboxPoints[key] = hitboxPoint;

							return {
								...prev,
								[direction]: nextHitboxPoints,
							};
						});
					}}
				/>
				<EditorButtons
					submit={async () => {
						Object.entries(hitboxPoints).forEach(entry => {
							gameEditorStore!.data.config.environment[name][variant][entry[0] as TDirection8].hitboxPoints = entry[1];
						});
						close();
					}}
					close={close}
					reset={reset}
					undo={undo}
					setDirection={setDirection}
				/>
			</div>
		</Modal>
	);
};