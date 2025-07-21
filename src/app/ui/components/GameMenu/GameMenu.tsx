import { JSXInternal } from "node_modules/preact/src/jsx";
import { useState } from "preact/hooks";
import { useClosingContext } from "../../contexts/closing/useClosingContext";
import { Button } from "../common/Button/Button";
import { Modal } from "../common/Modal/Modal";
import { Title } from "../common/Title/Title";
import { Options } from "./Options/Options";

type TGameMenuProps = {
	close: () => void
}

export const GameMenu = ({
	close,
}: TGameMenuProps) => {
	const [optionsIsOpen, setOptionsIsOpen] = useState(false);

	useClosingContext("gameMenu", close);

	let menuContent: JSXInternal.Element;

	if (optionsIsOpen) {
		menuContent = (
			<Options
				close={() => setOptionsIsOpen(false)}
			/>
		);
	} else {
		menuContent = (
			<div class="space-y-8">
				<Title>Menu</Title>
				<div class="space-y-2 flex flex-col">
					<Button
						onClick={() => setOptionsIsOpen(true)}
					>
						Options
					</Button>
				</div>
			</div>
		);
	}

	return (
		<Modal
			close={close}
		>
			{menuContent}
		</Modal>
	);
};