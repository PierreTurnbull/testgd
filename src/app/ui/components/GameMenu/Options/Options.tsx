import { data as editorData } from "@app/domains/editor/data/data";
import { configManager } from "@root/app/domains/configManager/configManager.singleton";
import { updateConfig } from "@root/app/domains/configManager/utils/updateConfig";
import { useClosingContext } from "@root/app/ui/contexts/closing/useClosingContext";
import { useState } from "preact/hooks";
import { Button } from "../../common/Button/Button";
import { Checkbox } from "../../common/Checkbox/Checkbox";
import { Title } from "../../common/Title/Title";

type TOptionsProps = {
	close: () => void
}

export const Options = ({
	close,
}: TOptionsProps) => {
	const [options, setOptions] = useState<typeof configManager.config.debug>(editorData.config.debug);

	const setIsChecked = (key: keyof typeof configManager.config.debug) => {
		setOptions(prev => {
			const nextOptions = structuredClone(prev);

			nextOptions[key] = !nextOptions[key];

			return nextOptions;
		});
	};

	const submit = () => {
		updateConfig({ debug: options });
		close();
	};

	useClosingContext("options", close);

	return (
		<div class="space-y-8">
			<Title>Options</Title>
			<div class="space-y-2">
				{
					Object.entries(options).map(entry => {
						const key = entry[0] as keyof typeof configManager.config.debug;
						const value = entry[1] as typeof configManager.config.debug[keyof typeof configManager.config.debug];

						return (
							<Checkbox
								isChecked={value}
								onClick={() => setIsChecked(key)}
								name={key}
								label={key}
							/>
						);
					})
				}
			</div>
			<div class="flex space-x-2">
				<Button
					onClick={submit}
				>
					Sauvegarder
				</Button>
				<Button
					onClick={close}
				>
					Annuler
				</Button>
			</div>
		</div>
	);
};