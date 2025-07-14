import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { useClosingContext } from "@root/app/ui/contexts/closing/useClosingContext";
import { ReactNode } from "preact/compat";
import { EditorBarPage } from "../../../common/EditorBarPage/EditorBarPage";
import { EnvironmentItemVariant } from "./EnvironmentItemVariant/EnvironmentItemVariant";

type TEnvironmentItemVariantsProps = {
	name:  string
	close: () => void
}

export const EnvironmentItemVariants = ({
	name,
	close,
}: TEnvironmentItemVariantsProps) => {
	useClosingContext("environmentItemVariants", close);

	const variantsCount = [...new Set(Object.keys(assetsManager.textures)
		.filter(key => key.includes(name))
		.map(key => trimDirection(key)))]
		.length;

	const renderVariants = () => {
		const variantEls: ReactNode[] = [];

		for (let i = 0; i < variantsCount; i++) {
			variantEls.push(
				<EnvironmentItemVariant name={name} variant={i} />,
			);
		}

		return variantEls;
	};

	return (
		<EditorBarPage>
			<div class="flex space-x-2">
				{renderVariants()}
			</div>
		</EditorBarPage>
	);
};