import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { assetsManager } from "@root/app/domains/assetsManager/assetsManager.singletons";
import { useClosingContext } from "@root/app/ui/contexts/closing/useClosingContext";
import { ReactNode, useState } from "preact/compat";
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

	const [optionsMenuIsOpenList, setOptionsMenuIsOpenList] = useState(Array(variantsCount).fill(false));

	const renderVariants = () => {
		const variantEls: ReactNode[] = [];

		for (let i = 0; i < variantsCount; i++) {
			variantEls.push(
				<EnvironmentItemVariant
					name={name}
					variant={i}
					optionsMenuIsOpen={optionsMenuIsOpenList[i]}
					setOptionsMenuIsOpen={(value: boolean) => {
						// ensure only 1 options menu is open at a time
						const newOptionsMenuIsOpenList = Array(variantsCount).fill(false);

						newOptionsMenuIsOpenList[i] = value;

						setOptionsMenuIsOpenList(newOptionsMenuIsOpenList);
					}}
				/>,
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