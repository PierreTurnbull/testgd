import { trimDirection } from "@root/app/common/utils/trimDirection/trimDirection";
import { assetsManager } from "@root/app/core/assetsManager/assetsManager.singletons";
import { ReactNode } from "preact/compat";
import { MenuItems } from "../../../../common/MenuItems/MenuItems";
import { Variant } from "./Variant/Variant";

type TVariantsProps = {
	name: string
}

export const Variants = ({
	name,
}: TVariantsProps) => {
	const variantsCount = [...new Set(Object.keys(assetsManager.textures)
		.filter(key => key.includes(name))
		.map(key => trimDirection(key)))]
		.length;

	const renderVariants = () => {
		const variantEls: ReactNode[] = [];

		for (let i = 0; i < variantsCount; i++) {
			variantEls.push(
				<Variant name={name} variant={i} />,
			);
		}

		return variantEls;
	};

	return (
		<MenuItems>
			{renderVariants()}
		</MenuItems>
	);
};