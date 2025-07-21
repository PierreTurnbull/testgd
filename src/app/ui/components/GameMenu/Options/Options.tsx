import { data as editorData } from "@app/domains/editor/data/data";
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
	const [options, setOptions] = useState<Record<string, boolean>>(editorData.config.debug);

	const setIsChecked = (key: string) => {
		setOptions(prev => {
			const nextOptions = structuredClone(prev);

			nextOptions[key] = !nextOptions[key];

			return nextOptions;
		});
	};

	const submit = () => {
		editorData.config.debug = options;
		close();
	};

	useClosingContext("options", close);

	return (
		<div class="space-y-8">
			<Title>Options</Title>
			<div class="space-y-2">
				{
					Object.entries(options).map(entry => {
						const key = entry[0];
						const value = entry[1];

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