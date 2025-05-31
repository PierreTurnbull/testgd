import { ReactNode, useRef } from "preact/compat";
import { ClosingContext } from "./closing.context";
import { TClosingContextState } from "./closing.contextState";

type TClosingProviderProps = {
	children: ReactNode
}

/**
 * Keep track of the opened UIs in the order in which they were opened.
 */
export const ClosingProvider = ({
	children,
}: TClosingProviderProps) => {
	const openedUis = useRef<string[]>([]);

	const registerUi = (key: string) => {
		if (openedUis.current.includes(key)) {
			throw new Error(`"${key}" is already registered in the closing context.`);
		}

		openedUis.current.push(key);
	};

	const removeUi = (key: string) => {
		const index = openedUis.current.indexOf(key);

		if (index === -1) {
			throw new Error(`"${key}" is not registered in the closing context.`);
		}

		openedUis.current = [
			...openedUis.current.slice(0, index),
			...openedUis.current.slice(index + 1),
		];
	};

	const getLastOpenedUi = () => {
		const lastOpenedUi = openedUis.current.at(-1) || null;

		return lastOpenedUi;
	};

	const contextState: TClosingContextState = {
		registerUi:      registerUi,
		removeUi:        removeUi,
		getLastOpenedUi: getLastOpenedUi,
	};

	return (
		<ClosingContext.Provider value={contextState}>
			{children}
		</ClosingContext.Provider>
	);
};