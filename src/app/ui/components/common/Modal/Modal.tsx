import { useClosingContext } from "@root/app/ui/contexts/closing/useClosingContext";
import { createPortal, ReactNode } from "preact/compat";
import { IconButton } from "../IconButton/IconButton";

type TModalProps = {
	children: ReactNode
	close:    () => void
}

const modalContainerEl = document.createElement("div");
modalContainerEl.id = "modal-container";
document.body.append(modalContainerEl);

export const Modal = ({
	children,
	close,
}: TModalProps) => {
	useClosingContext("modal", close);

	return createPortal(
		<div class="relative w-full h-full z-50 flex justify-center items-center">
			<div
				class="absolute w-full h-full bg-amber-400 opacity-50 z-10"
				onClick={_ => close()}
			>
			</div>
			<div class="relative p-8 rounded bg-amber-800 z-20">
				{children}
			</div>
			<div class="absolute top-4 right-4 z-20">
				<IconButton
					icon="✖"
					onClick={_ => close()}
				/>
			</div>
		</div>,
		modalContainerEl,
	);
};